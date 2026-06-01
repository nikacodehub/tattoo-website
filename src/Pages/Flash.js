import { useCallback, useEffect, useRef, useState } from "react";
import "./Flash.css";

const flashDesigns = [
    {
        title: "Fragmented portrait",
        description: "Black and grey portrait with hands, cracked details and sharp abstract strokes.",
        image: "/images/flashIMG_1079.jpeg",
    },
    {
        title: "Forest spirit",
        description: "Moody forest portrait with moonlight, owl details and warm eye accents.",
        image: "/images/flashIMG_1788.jpeg",
    },
    {
        title: "Tiger and roses",
        description: "Color shoulder concept with a tiger head, roses and soft warm background tones.",
        image: "/images/flashIMG_2880.jpeg",
    },
    {
        title: "Blue paint portrait",
        description: "Expressive color portrait with painted hands, blue tones and graphic texture.",
        image: "/images/flashIMG_2881.jpeg",
    },
    {
        title: "Ornamental daisy",
        description: "Delicate flower design with clean black ornamental strokes and soft color.",
        image: "/images/flashIMG_2882.jpeg",
    },
    {
        title: "Viking raven",
        description: "Black and grey Viking-inspired portrait with raven elements and geometric framing.",
        image: "/images/flashIMG_2883.jpeg",
    },
    {
        title: "Split bear mask",
        description: "Black and grey bear concept mixing realistic texture with ornamental mask details.",
        image: "/images/flashIMG_2885.jpeg",
    },
    {
        title: "Viking skull",
        description: "Dark Norse skull design with helmet, axe details and geometric composition.",
        image: "/images/flashIMG_2886.jpeg",
    },
    {
        title: "Warrior portrait",
        description: "Black and grey warrior woman with helmet, sword detail and soft realistic shading.",
        image: "/images/flashIMG_2887.jpeg",
    },
    {
        title: "Ornamental eye",
        description: "Graphic forearm design with an ornamental eye and a bright turquoise accent.",
        image: "/images/flashIMG_2888.jpeg",
    },
    {
        title: "Broken icon",
        description: "Fragmented portrait design with rays, sword details and dramatic black shading.",
        image: "/images/flashIMG_2889.jpeg",
    },
    {
        title: "Memento raven",
        description: "Black and grey raven and sword concept with an architectural arch composition.",
        image: "/images/flashIMG_2890.jpeg",
    },
    {
        title: "Floral muse",
        description: "Soft black and grey portrait framed with large flowers and elegant shading.",
        image: "/images/flashIMG_2895.jpeg",
    },
    {
        title: "Flower portrait",
        description: "Gentle shoulder concept with a female portrait, flowers and smooth grey tones.",
        image: "/images/flashIMG_2896.jpeg",
    },
    {
        title: "Pink peony",
        description: "Color floral flash with bright petals, black stems and flowing graphic lines.",
        image: "/images/flashIMG_2898.jpeg",
    },
    {
        title: "Red rose ornament",
        description: "Color shoulder design with a red rose, ornamental lines and soft black accents.",
        image: "/images/flashIMG_2899.jpeg",
    },
    {
        title: "Red poppy flow",
        description: "Bright floral concept with red petals, dark ornamental curves and elegant movement.",
        image: "/images/flashIMG_2900.jpeg",
    },
    {
        title: "Gothic muse",
        description: "Dark female portrait with spiked headpiece, graphic strokes and dramatic contrast.",
        image: "/images/flashIMG_2909.jpeg",
    },
    {
        title: "Veiled rose",
        description: "Black and grey portrait with hands, jewelry, rose details and soft realism.",
        image: "/images/flashIMG_2910.jpeg",
    },
    {
        title: "Sugar skull lady",
        description: "Decorative portrait with skull makeup, vertical graphic strokes and bold contrast.",
        image: "/images/flashIMG_2911.jpeg",
    },
    {
        title: "Viking armband",
        description: "Norse-inspired armband project with knotwork, texture and black and grey flow.",
        image: "/images/flashIMG_3482.jpeg",
    },
    {
        title: "Warrior sleeve",
        description: "Full sleeve concept with warrior portrait, lion energy and warm eye accents.",
        image: "/images/flashIMG_9861.jpeg",
    },
    {
        title: "Dark fantasy sleeve",
        description: "Full sleeve idea with horned figure, raven details and deep black atmosphere.",
        image: "/images/flashIMG_9863.jpeg",
    },
    {
        title: "Dragon sleeve",
        description: "Black and grey sleeve concept with dragon movement, female portrait and soft smoke.",
        image: "/images/flashIMG_9864.jpeg",
    },
];

function Flash() {
    const flashRef = useRef(null);
    const [selectedDesignIndex, setSelectedDesignIndex] = useState(null);

    const selectedDesign = selectedDesignIndex === null ? null : flashDesigns[selectedDesignIndex];

    function handleMouseMove(event) {
        const rect = flashRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        flashRef.current.style.setProperty("--x", `${x}px`);
        flashRef.current.style.setProperty("--y", `${y}px`);
    }

    const showPreviousDesign = useCallback(() => {
        setSelectedDesignIndex((currentIndex) => {
            if (currentIndex === null) {
                return null;
            }

            return currentIndex === 0 ? flashDesigns.length - 1 : currentIndex - 1;
        });
    }, []);

    const showNextDesign = useCallback(() => {
        setSelectedDesignIndex((currentIndex) => {
            if (currentIndex === null) {
                return null;
            }

            return currentIndex === flashDesigns.length - 1 ? 0 : currentIndex + 1;
        });
    }, []);

    useEffect(() => {
        function handleKeyDown(event) {
            if (selectedDesignIndex === null) {
                return;
            }

            if (event.key === "Escape") {
                setSelectedDesignIndex(null);
            }

            if (event.key === "ArrowLeft") {
                showPreviousDesign();
            }

            if (event.key === "ArrowRight") {
                showNextDesign();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedDesignIndex, showPreviousDesign, showNextDesign]);

    return (
        <main ref={flashRef} className="flash-page" onMouseMove={handleMouseMove}>
            <h2 className="flash-subtitle">✦Wanna-do designs✦</h2>

            <section className="flash-grid">
                {flashDesigns.map((design, index) => (
                    <article className="flash-card" key={design.image}>
                        <button
                            className="flash-card-preview"
                            type="button"
                            onClick={() => setSelectedDesignIndex(index)}
                        >
                            <img src={design.image} alt={design.title} />
                        </button>

                        <div className="flash-card-content">
                            <h2>{design.title}</h2>
                            <p>{design.description}</p>
                        </div>
                    </article>
                ))}
            </section>

            {selectedDesign && (
                <div className="flash-lightbox" onClick={() => setSelectedDesignIndex(null)}>
                    <button className="flash-lightbox-close" type="button" aria-label="Close image" />

                    <button
                        className="flash-lightbox-arrow flash-lightbox-arrow-left"
                        type="button"
                        aria-label="Previous image"
                        onClick={(event) => {
                            event.stopPropagation();
                            showPreviousDesign();
                        }}
                    />

                    <div className="flash-lightbox-content" onClick={(event) => event.stopPropagation()}>
                        <p className="flash-lightbox-count">
                            {selectedDesignIndex + 1} / {flashDesigns.length}
                        </p>

                        <img src={selectedDesign.image} alt={selectedDesign.title} />

                        <h2>{selectedDesign.title}</h2>
                        <p>{selectedDesign.description}</p>
                    </div>

                    <button
                        className="flash-lightbox-arrow flash-lightbox-arrow-right"
                        type="button"
                        aria-label="Next image"
                        onClick={(event) => {
                            event.stopPropagation();
                            showNextDesign();
                        }}
                    />
                </div>
            )}
        </main>
    );
}

export default Flash;
