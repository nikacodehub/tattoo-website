import {useRef} from "react";
import SEO from "../Components/SEO";
import "./About.css";

function About() {
    const aboutRef = useRef(null);

    function handleMouseMove(event) {
        const rect = aboutRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        aboutRef.current.style.setProperty("--x", `${x}px`);
        aboutRef.current.style.setProperty("--y", `${y}px`);
    }

    return (
        <>
            <SEO
                title="About"
                description="Learn about Nika Vera, a Reykjavik tattoo artist specializing in color realism, black and grey realism, geometry and ornamental details."
                canonicalPath="/about"
            />
            <main ref={aboutRef} className="about-page" onMouseMove={handleMouseMove}>
                <section className="about-content">
                    <div className="about-layout">
                        <img
                            className="about-artist-image"
                            src="/images/about_artist.png"
                            alt="Nika, tattoo artist"
                        />

                        <div className="about-text">
                            <h1>About Me</h1>

                            <p>
                                Hey, my name is Nika. I have been tattooing since 2011.
                            </p>

                            <p>
                                I specialize in color and black and grey realism, often combining it
                                with geometry, ornamental details and trash polka elements. For me,
                                every tattoo should feel personal, expressive and created for one
                                specific person.
                            </p>

                            <p>
                                I work with professional tools, needles and high-quality inks, because
                                the tattoo should keep its contrast, detail and character as it heals
                                and ages.
                            </p>

                            <p>
                                The healing process matters just as much as the tattoo session itself.
                                I help each client choose aftercare that fits their skin and explain
                                how to take care of the tattoo step by step.
                            </p>

                            <p>
                                If you have an idea or a question, feel free to contact me. I will be
                                happy to discuss your future tattoo.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default About;
