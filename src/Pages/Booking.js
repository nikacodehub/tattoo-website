import { useRef, useState } from "react";
import "./Booking.css";

function Booking() {
    const [formData, setFormData] = useState({
        name: "",
        contactMethod: "email",
        email: "",
        instagram: "",
        idea: "",
    });

    const bookingRef = useRef(null);
    const [referenceImage, setReferenceImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);

    function handleMouseMove(event) {
        const rect = bookingRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        bookingRef.current.style.setProperty("--x", `${x}px`);
        bookingRef.current.style.setProperty("--y", `${y}px`);
    }

    function handleFileChange(event) {
        const file = event.target.files[0];

        setReferenceImage(file);
    }

    function validateForm(data, file) {
        const newErrors = {};

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const instagramPattern = /^@?[a-zA-Z0-9._]{1,30}$/;

        if (!data.name.trim()) {
            newErrors.name = "Please enter your name.";
        }

        if (data.contactMethod === "email" && !emailPattern.test(data.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (data.contactMethod === "instagram" && !instagramPattern.test(data.instagram)) {
            newErrors.instagram = "Please enter a valid Instagram username.";
        }

        if (data.idea.trim().length < 25) {
            newErrors.idea = "Please describe your tattoo idea in at least 25 characters.";
        }

        if (file && !file.type.startsWith("image/")) {
            newErrors.referenceImage = "Please upload an image file.";
        }

        return newErrors;
    }

    function handleBlur(event) {
        const { name } = event.target;

        setTouched((currentTouched) => ({
            ...currentTouched,
            [name]: true,
        }));

        setErrors(validateForm(formData, referenceImage));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validateForm(formData, referenceImage);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSubmitStatus("error");
             setTouched({
              name: true,
              email: true,
              instagram: true,
              idea: true,
              referenceImage: true,
             });
            return;
        }

        setErrors({});
        setSubmitStatus("success");

        console.log("Form data:", formData);
        console.log("Reference image:", referenceImage);
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }

    return (
        <main ref={bookingRef} className="booking-page" onMouseMove={handleMouseMove}>
            <section className="booking-content">
                <div className="booking-intro">
                    <p className="booking-subtitle">Tattoo request</p>
                    <h1>Book a tattoo</h1>
                    <p>
                        Tell me about your idea, placement and preferred contact method. I will review your request and
                        get back to you.
                    </p>
                </div>

                <form className="booking-form" onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.name && errors.name && <span className="booking-error">{errors.name}</span>}
                    </label>

                    <fieldset className="booking-fieldset">
                        <legend>Preferred contact method</legend>

                        <label>
                            <input
                                type="radio"
                                name="contactMethod"
                                value="email"
                                checked={formData.contactMethod === "email"}
                                onChange={handleChange}
                            />
                            Email
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="contactMethod"
                                value="instagram"
                                checked={formData.contactMethod === "instagram"}
                                onChange={handleChange}
                            />
                            Instagram
                        </label>
                    </fieldset>

                    {formData.contactMethod === "email" ? (
                        <label>
                            Email
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.email && errors.email && <span className="booking-error">{errors.email}</span>}
                        </label>
                    ) : (
                        <label>
                            Instagram
                            <input
                                type="text"
                                name="instagram"
                                value={formData.instagram}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.instagram && errors.instagram && (
                                <span className="booking-error">{errors.instagram}</span>
                            )}
                        </label>
                    )}

                    <label>
                        Tattoo idea
                        <textarea
                            name="idea"
                            rows="5"
                            value={formData.idea}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.idea && errors.idea && <span className="booking-error">{errors.idea}</span>}
                    </label>

                    <label>
                        Reference image (optional)
                        <input
                            type="file"
                            name="referenceImage"
                            accept="image/*"
                            onChange={handleFileChange}
                            onBlur={handleBlur}
                        />
                        {touched.referenceImage && errors.referenceImage && (
                            <span className="booking-error">{errors.referenceImage}</span>
                        )}
                    </label>
                    {submitStatus === "success" && (
    <p className="booking-submit-message booking-submit-message-success">
        Thank you! Your request is ready to be sent.
    </p>
)}

{submitStatus === "error" && (
    <p className="booking-submit-message booking-submit-message-error">
        Oops! Please check the highlighted fields.
    </p>
)}

                    <button type="submit">Send request</button>
                </form>
            </section>
        </main>
    );
}

export default Booking;
