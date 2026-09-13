function jsonResponse(body, status = 200, headers = {}) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    });
}

async function handleBookingRequest(request, env) {
    if (request.method !== "POST") {
        return jsonResponse({ message: "Method not allowed." }, 405, {
            Allow: "POST",
        });
    }

    if (!env.BOOKING_EMAIL_WORKER) {
        return jsonResponse({ message: "Booking email service is not configured." }, 500);
    }

    try {
        return await env.BOOKING_EMAIL_WORKER.fetch(request);
    } catch (error) {
        console.error("Booking email worker failed:", error);

        return jsonResponse({ message: "Unable to send your request right now." }, 500);
    }
}

export default {
    async fetch(request, env) {
        const { pathname } = new URL(request.url);

        if (pathname === "/api/booking" || pathname === "/api/booking/") {
            return handleBookingRequest(request, env);
        }

        if (pathname.startsWith("/api/")) {
            return jsonResponse({ message: "Not found." }, 404);
        }

        return env.ASSETS.fetch(request);
    },
};

export const testExports = {
    handleBookingRequest,
};
