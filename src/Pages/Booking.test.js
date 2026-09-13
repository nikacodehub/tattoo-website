import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Booking from "./Booking";

describe("Booking form", () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        delete global.fetch;
    });

    test("renders the booking form with email selected by default", () => {
        render(<Booking />);

        expect(screen.getByRole("heading", { name: /book a tattoo/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
        expect(screen.getByRole("radio", { name: /email/i })).toBeChecked();
        expect(screen.getByRole("textbox", { name: /^email$/i })).toBeInTheDocument();
        expect(screen.queryByRole("textbox", { name: /^instagram$/i })).not.toBeInTheDocument();
    });

    test("switches contact input when Instagram is selected", () => {
        render(<Booking />);

        userEvent.click(screen.getByRole("radio", { name: /instagram/i }));

        expect(screen.getByRole("radio", { name: /instagram/i })).toBeChecked();
        expect(screen.getByRole("textbox", { name: /^instagram$/i })).toBeInTheDocument();
        expect(screen.queryByRole("textbox", { name: /^email$/i })).not.toBeInTheDocument();
    });

    test("shows validation errors when required fields are submitted empty", () => {
        render(<Booking />);

        userEvent.click(screen.getByRole("button", { name: /send request/i }));

        expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
        expect(screen.getByText(/at least 25 characters/i)).toBeInTheDocument();
        expect(screen.getByText(/oops/i)).toBeInTheDocument();
        expect(screen.queryByText(/please upload an image file/i)).not.toBeInTheDocument();
    });

    test("shows an error after a touched field loses focus", () => {
        render(<Booking />);

        fireEvent.blur(screen.getByLabelText(/^name$/i));

        expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    });

    test("sends valid email booking data to the booking API", async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ message: "Thank you! Your request has been sent." }),
        });

        render(<Booking />);

        userEvent.type(screen.getByLabelText(/^name$/i), "Nika");
        userEvent.type(screen.getByRole("textbox", { name: /^email$/i }), "nika@example.com");
        userEvent.type(
            screen.getByLabelText(/tattoo idea/i),
            "I want a black and grey floral sleeve with soft realistic shading."
        );

        userEvent.click(screen.getByRole("button", { name: /send request/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                "/api/booking",
                expect.objectContaining({
                    method: "POST",
                    body: expect.any(FormData),
                })
            );
        });

        expect(await screen.findByText(/thank you/i)).toBeInTheDocument();
    });

    test("validates uploaded file type when a reference file is provided", () => {
        render(<Booking />);

        userEvent.type(screen.getByLabelText(/^name$/i), "Nika");
        userEvent.type(screen.getByRole("textbox", { name: /^email$/i }), "nika@example.com");
        userEvent.type(
            screen.getByLabelText(/tattoo idea/i),
            "I want a color tattoo with flowers and expressive abstract movement."
        );

        const textFile = new File(["hello"], "notes.txt", { type: "text/plain" });
        fireEvent.change(screen.getByLabelText(/reference image/i), {
            target: { files: [textFile] },
        });

        userEvent.click(screen.getByRole("button", { name: /send request/i }));

        expect(screen.getByText(/please upload an image file/i)).toBeInTheDocument();
        expect(global.fetch).not.toHaveBeenCalled();
    });

    test("validates uploaded file size when a reference file is too large", () => {
        render(<Booking />);

        userEvent.type(screen.getByLabelText(/^name$/i), "Nika");
        userEvent.type(screen.getByRole("textbox", { name: /^email$/i }), "nika@example.com");
        userEvent.type(
            screen.getByLabelText(/tattoo idea/i),
            "I want a black and grey ornamental tattoo with a botanical reference."
        );

        const largeImage = new File(["x"], "reference.jpg", { type: "image/jpeg" });
        Object.defineProperty(largeImage, "size", { value: 6 * 1024 * 1024 });

        fireEvent.change(screen.getByLabelText(/reference image/i), {
            target: { files: [largeImage] },
        });

        userEvent.click(screen.getByRole("button", { name: /send request/i }));

        expect(screen.getByText(/smaller than 5mb/i)).toBeInTheDocument();
        expect(global.fetch).not.toHaveBeenCalled();
    });

    test("shows an error message when the booking API fails", async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            json: async () => ({ message: "Unable to send your request right now." }),
        });

        render(<Booking />);

        userEvent.type(screen.getByLabelText(/^name$/i), "Nika");
        userEvent.type(screen.getByRole("textbox", { name: /^email$/i }), "nika@example.com");
        userEvent.type(
            screen.getByLabelText(/tattoo idea/i),
            "I want a fine line botanical tattoo with a small abstract detail."
        );

        userEvent.click(screen.getByRole("button", { name: /send request/i }));

        expect(await screen.findByText(/unable to send your request/i)).toBeInTheDocument();
    });
});
