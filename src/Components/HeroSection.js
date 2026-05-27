import "./HeroSection.css";
import {useRef} from "react";
import{Link} from "react-router-dom";

function HeroSection(){
    const heroRef = useRef(null);
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
            <p className="hero-subtitle"> Tattoo Artist in Reykjavik </p>
           <Link to="/portfolio" className="hero-title-link">
           <h1>Realistic Tattoos</h1>
           </Link>
            <p className="hero-text">Blackwork, realism and custom tattoo designs.</p>
            <a className="hero-button" href="/booking">Book a session</a>
        </section>
    );
}

export default HeroSection;