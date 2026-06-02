import { useRef } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

function Contact() {
    const contactRef = useRef(null);

function handleMouseMove(event) {
    const rect = contactRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    contactRef.current.style.setProperty("--x", `${x}px`);
    contactRef.current.style.setProperty("--y", `${y}px`);
}
    return (
        <main
    ref={contactRef}
    className="contact-page"
    onMouseMove={handleMouseMove}
>
            <section className="contact-content">
                <p className="contact-subtitle">Get in touch</p>
                <h1>Contact Me</h1>

                <p className="contact-text">
                    For tattoo questions, collaborations or general inquiries, feel free to contact me.
                    If you want to request a tattoo project, please use the booking form.
                </p>

                <div className="contact-links">
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                        Instagram
                    </a>

                    <a href="mailto:your@email.com">
                        Email
                    </a>

                    <Link to="/booking">
                        Booking form
                    </Link>
                </div>

                <p className="contact-location">Reykjavik, Iceland</p>
            </section>
        </main>
    );
}

export default Contact;