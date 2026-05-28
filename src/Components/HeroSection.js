import "./HeroSection.css";
import {useRef, useState} from "react";
import{Link} from "react-router-dom";

function HeroSection(){
    const heroRef = useRef(null);
    const [heroMode, setHeroMode] = useState("split");

    function handleMouseMove(event) {
        const rect= heroRef.current.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        heroRef.current.style.setProperty("--x", `${x}px`);
        heroRef.current.style.setProperty("--y", `${y}px`);
    }

    return(
        <section 
        ref={heroRef}
        className="hero"
        onMouseMove={handleMouseMove}
        >
            <h2 className="hero-subtitle"> ✦Tattoo Artist in Reykjavik✦ </h2>
            <Link to="/about" className={`hero-artist-photo hero-mode-${heroMode}`}>
                <img
                    className="hero-artist-photo-color"
                    src="/images/artist-working.jpeg"
                    alt="Tattoo artist working"
                />

                <img
                    className="hero-artist-photo-black"
                    src="/images/artist-working.jpeg"
                    alt=""
                    aria-hidden="true"
                />

                <span>About the artist</span>
            </Link>

            <div className="hero-portfolio-text-links">
                <Link
                    to="/portfolio/black-grey"

                    className="hero-portfolio-text-link"
                    onMouseEnter={() => setHeroMode("black")}
                    onMouseLeave={() => setHeroMode("split")}
                    onFocus={() => setHeroMode("black")}
                    onBlur={() => setHeroMode("split")}
                >
                    Black & Grey Tattoos
                </Link>

                <Link
                    to="/portfolio/color"
                    className="hero-portfolio-text-link"
                    onMouseEnter={() => setHeroMode("color")}
                    onMouseLeave={() => setHeroMode("split")}
                    onFocus={() => setHeroMode("color")}
                    onBlur={() => setHeroMode("split")}
                >
                    Color Tattoos
                </Link>
            </div>
        </section>
    );
}

export default HeroSection;
