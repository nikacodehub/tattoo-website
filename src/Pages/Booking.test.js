import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Booking from "./Booking";

describe("Booking form", () => {
    beforeEach(() => {
        jest.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        console.log.mockRestore();
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

    test("shows success message when valid email booking data is submitted", () => {
        render(<Booking />);

        userEvent.type(screen.getByLabelText(/^name$/i), "Nika");
        userEvent.type(screen.getByRole("textbox", { name: /^email$/i }), "nika@example.com");
        userEvent.type(
            screen.getByLabelText(/tattoo idea/i),
            "I want a black and grey floral sleeve with soft realistic shading."
        );

        userEvent.click(screen.getByRole("button", { name: /send request/i }));

        expect(screen.getByText(/thank you/i)).toBeInTheDocument();
        expect(screen.queryByText(/oops/i)).not.toBeInTheDocument();
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
    });
});
