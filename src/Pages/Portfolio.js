import {useRef} from "react";
import {Link} from "react-router-dom";

import "./Portfolio.css";

function Portfolio() {
    const portfolioRef = useRef(null);

    function handleMouseMove(event) {
        const rect = portfolioRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        portfolioRef.current.style.setProperty("--x", `${x}px`);
        portfolioRef.current.style.setProperty("--y", `${y}px`);
    }

    return (
        <main
            ref={portfolioRef}
            className="portfolio-page"
            onMouseMove={handleMouseMove}
        >
            <h2>NikaVera's Tattoo Works</h2>

            <section className="portfolio-choice">
                <Link to="/portfolio/black-grey" className="portfolio-choice-card portfolio-choice-black">
                    <img src="/images/IMG_4013.jpeg" alt="Black and grey tattoos" />
                    <span>Black & Grey Tattoos</span>
                </Link>

                <Link to="/portfolio/color" className="portfolio-choice-card portfolio-choice-color">
                    <img src="/images/IMG_2957.jpeg" alt="Color tattoos" />
                    <span>Color Tattoos</span>
                </Link>
            </section>
        </main>
    );
}

export default Portfolio;
