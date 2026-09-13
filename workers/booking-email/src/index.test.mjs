import assert from "node:assert/strict";
import { describe, test } from "node:test";
import worker, { testExports } from "./index.js";

const { BOOKING_FROM_EMAIL, BOOKING_RECIPIENT, sendBookingEmail, validateBooking } = testExports;

function createValidFormData() {
    const formData = new FormData();

    formData.set("name", "Nika");
    formData.set("contactMethod", "email");
    formData.set("email", "nika@example.com");
    formData.set("idea", "I want a black and grey floral sleeve with soft realistic shading.");

    return formData;
}

function createEnv(overrides = {}) {
    const sentMessages = [];

    return {
        sentMessages,
        EMAIL: {
            async send(message) {
                sentMessages.push(message);

                return { messageId: "test-message-id" };
            },
        },
        BOOKING_FROM_EMAIL,
        BOOKING_RECIPIENT,
        ...overrides,
    };
}

describe("booking email worker", () => {
    test("validates required booking fields", () => {
        const errors = validateBooking(
            {
                name: "",
                contactMethod: "email",
                email: "not-an-email",
                instagram: "",
                idea: "too short",
            },
            null
        );

        assert.equal(errors.name, "Please enter your name.");
        assert.equal(errors.email, "Please enter a valid email address.");
        assert.equal(errors.idea, "Please describe your tattoo idea in at least 25 characters.");
    });

    test("sends valid booking email only to the configured recipient and sender", async () => {
        const env = createEnv();
        const request = new Request("https://worker.test", {
            method: "POST",
            body: createValidFormData(),
        });

        const response = await sendBookingEmail(request, env);
        const body = await response.json();

        assert.equal(response.status, 200);
        assert.equal(body.message, "Thank you! Your request has been sent.");
        assert.equal(env.sentMessages.length, 1);
        assert.equal(env.sentMessages[0].to, BOOKING_RECIPIENT);
        assert.equal(env.sentMessages[0].from, BOOKING_FROM_EMAIL);
        assert.equal(env.sentMessages[0].replyTo, "nika@example.com");
        assert.equal(env.sentMessages[0].attachments, undefined);
    });

    test("includes an uploaded reference image as an attachment", async () => {
        const env = createEnv();
        const formData = createValidFormData();
        const referenceImage = new File(["image-bytes"], "reference.jpg", { type: "image/jpeg" });

        formData.set("referenceImage", referenceImage);

        const response = await sendBookingEmail(
            new Request("https://worker.test", {
                method: "POST",
                body: formData,
            }),
            env
        );

        assert.equal(response.status, 200);
        assert.equal(env.sentMessages.length, 1);
        assert.equal(env.sentMessages[0].attachments.length, 1);
        assert.equal(env.sentMessages[0].attachments[0].filename, "reference.jpg");
        assert.equal(env.sentMessages[0].attachments[0].type, "image/jpeg");
        assert.equal(env.sentMessages[0].attachments[0].disposition, "attachment");
        assert.ok(env.sentMessages[0].attachments[0].content instanceof ArrayBuffer);
    });

    test("rejects misconfigured destination or sender", async () => {
        const env = createEnv({ BOOKING_RECIPIENT: "someone@example.com" });
        const response = await sendBookingEmail(
            new Request("https://worker.test", {
                method: "POST",
                body: createValidFormData(),
            }),
            env
        );

        assert.equal(response.status, 500);
        assert.equal(env.sentMessages.length, 0);
    });

    test("rejects non-POST requests", async () => {
        const response = await worker.fetch(new Request("https://worker.test", { method: "GET" }), createEnv());
        const body = await response.json();

        assert.equal(response.status, 405);
        assert.equal(body.message, "Method not allowed.");
    });
});
