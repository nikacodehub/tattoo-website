import assert from "node:assert/strict";
import { describe, test } from "node:test";
import worker from "./index.mjs";

function createEnv(overrides = {}) {
    const calls = [];

    return {
        calls,
        ASSETS: {
            async fetch(request) {
                calls.push({ type: "assets", request });

                return new Response("asset response");
            },
        },
        BOOKING_EMAIL_WORKER: {
            async fetch(request) {
                calls.push({ type: "booking", request });

                return new Response(JSON.stringify({ message: "sent" }), {
                    headers: { "Content-Type": "application/json" },
                });
            },
        },
        ...overrides,
    };
}

describe("tattoo website worker", () => {
    test("forwards POST /api/booking to the booking email service binding", async () => {
        const env = createEnv();
        const request = new Request("https://nikaveratattoo.com/api/booking", {
            method: "POST",
            body: new FormData(),
        });

        const response = await worker.fetch(request, env);
        const body = await response.json();

        assert.equal(response.status, 200);
        assert.equal(body.message, "sent");
        assert.equal(env.calls.length, 1);
        assert.equal(env.calls[0].type, "booking");
        assert.equal(env.calls[0].request, request);
    });

    test("rejects non-POST booking requests without calling the service binding", async () => {
        const env = createEnv();
        const response = await worker.fetch(new Request("https://nikaveratattoo.com/api/booking"), env);
        const body = await response.json();

        assert.equal(response.status, 405);
        assert.equal(response.headers.get("Allow"), "POST");
        assert.equal(body.message, "Method not allowed.");
        assert.equal(env.calls.length, 0);
    });

    test("reports a missing booking service binding", async () => {
        const env = createEnv({ BOOKING_EMAIL_WORKER: undefined });
        const response = await worker.fetch(
            new Request("https://nikaveratattoo.com/api/booking", {
                method: "POST",
                body: new FormData(),
            }),
            env
        );
        const body = await response.json();

        assert.equal(response.status, 500);
        assert.equal(body.message, "Booking email service is not configured.");
        assert.equal(env.calls.length, 0);
    });

    test("returns JSON 404 for unknown API routes", async () => {
        const env = createEnv();
        const response = await worker.fetch(new Request("https://nikaveratattoo.com/api/unknown"), env);
        const body = await response.json();

        assert.equal(response.status, 404);
        assert.equal(body.message, "Not found.");
        assert.equal(env.calls.length, 0);
    });

    test("serves non-API requests from static assets", async () => {
        const env = createEnv();
        const request = new Request("https://nikaveratattoo.com/portfolio");
        const response = await worker.fetch(request, env);

        assert.equal(await response.text(), "asset response");
        assert.equal(env.calls.length, 1);
        assert.equal(env.calls[0].type, "assets");
        assert.equal(env.calls[0].request, request);
    });
});
