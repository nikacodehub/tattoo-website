import "./HeroSection.css";

function HeroSection(){
    return(
        <section className="hero">
            <p className="hero-subtitle"> Tattoo Artist in Reykjavik </p>
            <h1>Realistic tattoos</h1>
            <p className="hero-text">Blackwork, realism and custom tattoo designs.</p>
            <a className="hero-button" href="/booking">Book a session</a>
        </section>
    );
}

export default HeroSection;