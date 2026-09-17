import { useRef } from "react";
import { Link } from "react-router-dom";
import SEO from "../Components/SEO";
import "./Prices.css";

const includedTime = [
    "Design preparation",
    "Skin preparation",
    "Shaving and disinfecting",
    "Stencil placement and adjustments",
    "Lunch breaks",
    "Taking photos after the tattoo",
    "Applying a compress/dressing",
    "Applying second skin",
];

function Prices() {
    const pricesRef = useRef(null);

    function handleMouseMove(event) {
        const rect = pricesRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        pricesRef.current.style.setProperty("--x", `${x}px`);
        pricesRef.current.style.setProperty("--y", `${y}px`);
    }

    return (
        <>
            <SEO
                title="Tattoo Prices in Reykjavík"
                description="Tattoo pricing for custom tattoos and available designs by Nika Vera in Reykjavík, Iceland. See hourly and full-day rates and what is included in the price."
                canonicalPath="/prices"
            />
            <main ref={pricesRef} className="prices-page" onMouseMove={handleMouseMove}>
                <div className="prices-content">
                    <header className="prices-intro">
                        <p className="prices-subtitle">Pricing</p>
                        <h1>Tattoo Prices</h1>
                        <p>
                            Clear and transparent pricing for custom tattoo projects. You only pay for the time I am
                            actively tattooing your skin.
                        </p>
                    </header>

                    <section className="prices-rates" aria-label="Tattoo rates">
                        <article className="prices-rate-card">
                            <h2>Hourly rate</h2>
                            <p className="prices-amount">20,000 ISK</p>
                        </article>
                        <article className="prices-rate-card">
                            <h2>Full-day session</h2>
                            <p className="prices-amount">120,000 ISK</p>
                            <p>Up to 6 hours of actual tattooing.</p>
                        </article>
                    </section>

                    <p className="prices-rate-note">
                        For custom projects, the final price is based on the actual tattooing time.
                    </p>

                    <section className="prices-section prices-information">
                        <p className="prices-subtitle">Important pricing information</p>
                        <h2>You are charged only for tattooing time</h2>
                        <p>
                            You only pay for the time I am actively tattooing your skin. The following time is not
                            charged:
                        </p>
                        <ul>
                            {includedTime.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                        <p>
                            Custom design preparation is included in the tattoo price at no additional cost.
                        </p>
                        <aside className="prices-example">
                            <strong>Example</strong>
                            <p>
                                If your appointment takes 5 hours in total, but the actual tattooing time is 3 hours,
                                you are charged for 3 hours of tattooing — not 5 hours.
                            </p>
                        </aside>
                    </section>

                    <section className="prices-section">
                        <p className="prices-subtitle">Pre-drawn work</p>
                        <h2>Available Designs</h2>
                        <p>
                            Available pre-drawn and wanna-do designs are offered at special discounted prices. Each
                            design has its own individual price, which may differ from my standard hourly rate.
                        </p>
                    </section>

                    <section className="prices-cta">
                        <h2>Have a tattoo idea?</h2>
                        <p>Send me your idea and I can give you an estimated price before your appointment.</p>
                        <Link to="/booking">Booking</Link>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Prices;
