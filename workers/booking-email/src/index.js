const BOOKING_RECIPIENT = "info.nikaveratattoo@gmail.com";
const BOOKING_FROM_EMAIL = "bookings@nikaveratattoo.com";
const MAX_REFERENCE_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

function jsonResponse(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getString(formData, key, fallback = "") {
    return String(formData.get(key) || fallback);
}

function isUploadedFile(value) {
    return typeof File !== "undefined" && value instanceof File && value.size > 0;
}

function validateBooking(data, file) {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const instagramPattern = /^@?[a-zA-Z0-9._]{1,30}$/;

    if (!data.name.trim()) {
        errors.name = "Please enter your name.";
    }

    if (!["email", "instagram"].includes(data.contactMethod)) {
        errors.contactMethod = "Please choose a contact method.";
    }

    if (data.contactMethod === "email" && !emailPattern.test(data.email)) {
        errors.email = "Please enter a valid email address.";
    }

    if (data.contactMethod === "instagram" && !instagramPattern.test(data.instagram)) {
        errors.instagram = "Please enter a valid Instagram username.";
    }

    if (data.idea.trim().length < 25) {
        errors.idea = "Please describe your tattoo idea in at least 25 characters.";
    }

    if (file) {
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            errors.referenceImage = "Please upload a JPG, PNG, GIF, or WebP image.";
        }

        if (file.size > MAX_REFERENCE_IMAGE_SIZE) {
            errors.referenceImage = "Please upload an image smaller than 5MB.";
        }
    }

    return errors;
}

function buildBookingData(formData) {
    return {
        name: getString(formData, "name"),
        contactMethod: getString(formData, "contactMethod", "email"),
        email: getString(formData, "email"),
        instagram: getString(formData, "instagram"),
        idea: getString(formData, "idea"),
    };
}

function buildEmailHtml(data, file) {
    const contactValue = data.contactMethod === "email" ? data.email : data.instagram;

    return `
        <h1>New tattoo booking request</h1>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Preferred contact:</strong> ${escapeHtml(data.contactMethod)}</p>
        <p><strong>Contact details:</strong> ${escapeHtml(contactValue)}</p>
        <p><strong>Tattoo idea:</strong></p>
        <p>${escapeHtml(data.idea).replace(/\n/g, "<br>")}</p>
        ${
            file
                ? `<p><strong>Reference image:</strong> ${escapeHtml(file.name)} attached.</p>`
                : "<p><strong>Reference image:</strong> None provided.</p>"
        }
    `;
}

function buildEmailText(data, file) {
    const contactValue = data.contactMethod === "email" ? data.email : data.instagram;

    return [
        "New tattoo booking request",
        "",
        `Name: ${data.name}`,
        `Preferred contact: ${data.contactMethod}`,
        `Contact details: ${contactValue}`,
        "",
        "Tattoo idea:",
        data.idea,
        "",
        file ? `Reference image attached: ${file.name}` : "Reference image: None provided.",
    ].join("\n");
}

async function sendBookingEmail(request, env) {
    if (!env.EMAIL) {
        return jsonResponse({ message: "Email service is not configured." }, 500);
    }

    const recipient = env.BOOKING_RECIPIENT || BOOKING_RECIPIENT;
    const fromEmail = env.BOOKING_FROM_EMAIL || BOOKING_FROM_EMAIL;

    if (recipient !== BOOKING_RECIPIENT || fromEmail !== BOOKING_FROM_EMAIL) {
        return jsonResponse({ message: "Booking email service is misconfigured." }, 500);
    }

    const formData = await request.formData();
    const referenceImage = formData.get("referenceImage");
    const file = isUploadedFile(referenceImage) ? referenceImage : null;
    const data = buildBookingData(formData);
    const errors = validateBooking(data, file);

    if (Object.keys(errors).length > 0) {
        return jsonResponse({ message: "Please check the highlighted fields.", errors }, 400);
    }

    const message = {
        to: recipient,
        from: fromEmail,
        subject: `Tattoo booking request from ${data.name.trim()}`,
        html: buildEmailHtml(data, file),
        text: buildEmailText(data, file),
    };

    if (data.contactMethod === "email") {
        message.replyTo = data.email;
    }

    if (file) {
        message.attachments = [
            {
                filename: file.name,
                content: await file.arrayBuffer(),
                type: file.type,
                disposition: "attachment",
            },
        ];
    }

    try {
        await env.EMAIL.send(message);

        return jsonResponse({ message: "Thank you! Your request has been sent." });
    } catch (error) {
        console.error("Booking email failed:", error);

        return jsonResponse({ message: "Unable to send your request right now." }, 500);
    }
}

export default {
    async fetch(request, env) {
        if (request.method !== "POST") {
            return jsonResponse({ message: "Method not allowed." }, 405);
        }

        return sendBookingEmail(request, env);
    },
};

export const testExports = {
    BOOKING_FROM_EMAIL,
    BOOKING_RECIPIENT,
    buildEmailHtml,
    buildEmailText,
    sendBookingEmail,
    validateBooking,
};
