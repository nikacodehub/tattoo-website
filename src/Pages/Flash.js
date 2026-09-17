import { useCallback, useEffect, useRef, useState } from "react";
import SEO from "../Components/SEO";
import "./Flash.css";

const flashDesigns = [
      {
        title: "Hidden Gaze",
        description: "Similar size and placement will take approximately 2 sessions.",
        image: "/images/legTattooGirl1.jpeg",
    },
      {
        title: "Rebel Within",
        description: "Similar size and placement will take approximately 1 session.",
        image: "/images/legTattooGirl2.jpeg",
    },
      {
        title: "Nordic Raven",
        description: "Similar size and placement will take approximately 3 hours.",
        image: "/images/MinimalisticRavenWannaDo.jpeg",
    },
     {
        title: "Ravens and Rune",
        description: "Similar size and placement will take approximately 1 session.",
        image: "/images/ravensWannaDo.jpeg",
    },
      {
        title: "Viking Longship with Vegvisir",
        description: "Similar size and placement will take approximately 4 hours.",
        image: "/images/ShipWannaDoMinimalism.jpeg",
    },
     {
        title: "Raven with a quote by Edgar Allan Poe",
        description: "Similar size and placement will take approximately 2 sessions.",
        image: "/images/wannadoChest.jpeg",
    },
      {
        title: "Falling Within",
        description: "Similar size and placement will take approximately 1,5 sessions.",
        image: "/images/WannaDoConcept1.jpeg",
    },
     {
        title: "Nocturne",
        description: "Similar size and placement will take approximately 2 sessions.",
        image: "/images/WannaDoConcept2.jpeg",
    },
     {
        title: "Obscured",
        description: "Approximate time and placements after clarification.",
        image: "/images/WannaDoLeavesFace.jpeg",
    },
    {
        title: "Fragmented portrait",
        description: "Similar size and placement will take approximately 1 session.",
        image: "/images/flashIMG_1079.jpeg",
    },
    {
        title: "Forest spirit",
        description: "Similar size and placement will take approximately 1 session.",
        image: "/images/flashIMG_1788.jpeg",
    },
    {
        title: "Tiger and roses",
        description: "Similar size and placement will take approximately 1,5 session.",
        image: "/images/flashIMG_2880.jpeg",
    },
    {
        title: "Blue paint portrait",
        description: "Similar size and placement will take approximately 2 sessions.",
        image: "/images/flashIMG_2881.jpeg",
    },
    {
        title: "Ornamental daisy",
        description: "Similar size and placement will take approximately 3 hours.",
        image: "/images/flashIMG_2882.jpeg",
    },
    {
        title: "Viking raven",
        description: "Similar size and placement will take approximately 1 session.",
        image: "/images/flashIMG_2883.jpeg",
    },
    {
        title: "Split bear mask",
        description: "Similar size and placement will take approximately 1 session.",
        image: "/images/flashIMG_2885.jpeg",
    },
    {
        title: "Viking skull",
        description: "Similar size and placement will take approximately 1 session.",
        image: "/images/flashIMG_2886.jpeg",
    },
    {
        title: "Warrior portrait",
        description: "Similar size and placement will take approximately 1 session.",
        image: "/images/flashIMG_2887.jpeg",
    },
    {
        title: "Sacred Heart Eye",
        description: "Similar size and placement will take approximately 1 session.",
        image: "/images/flashIMG_2888.jpeg",
    },
    {
        title: "Broken icon",
        description: "Similar size and placement will take approximately 1 session.",
        image: "/images/flashIMG_2889.jpeg",
    },
    {
        title: "Memento raven",
        description: "Similar size and placement will take approximately 1 session.",
        image: "/images/flashIMG_2890.jpeg",
    },
    {
        title: "Floral muse",
        description: "Similar size and placement will take approximately 1,5 session.",
        image: "/images/flashIMG_2895.jpeg",
    },
    {
        title: "Flower portrait",
        description: "Similar size and placement will take approximately 1,5 session.",
        image: "/images/flashIMG_2896.jpeg",
    },
    {
        title: "Pink peony",
        description: "Similar size and placement will take approximately 4 hours.",
        image: "/images/flashIMG_2898.jpeg",
    },
    {
        title: "Red rose ornament",
        description: "Similar size and placement will take approximately 4 hours.",
        image: "/images/flashIMG_2899.jpeg",
    },
    {
        title: "Red poppy flow",
        description: "Similar size and placement will take approximately 3 hours.",
        image: "/images/flashIMG_2900.jpeg",
    },
    {
        title: "Gothic muse",
        description: "Similar size and placement will take approximately 2 sessions.",
        image: "/images/flashIMG_2909.jpeg",
    },
    {
        title: "Veiled rose",
        description: "Similar size and placement will take approximately 2 sessions.",
        image: "/images/flashIMG_2910.jpeg",
    },
    {
        title: "Sugar skull lady",
        description: "Similar size and placement will take approximately 2 sessions.",
        image: "/images/flashIMG_2911.jpeg",
    },
    {
        title: "Viking armband",
        description: "Similar size and placement will take approximately 2 sessions.",
        image: "/images/flashIMG_3482.jpeg",
    },
    {
        title: "Warrior sleeve",
        description: "Similar size and placement will take approximately 3 session (only outer side of the arm).",
        image: "/images/flashIMG_9861.jpeg",
    },
    {
        title: "Dark fantasy sleeve",
        description: "FSimilar size and placement will take approximately 3 session (only outer side of the arm).",
        image: "/images/flashIMG_9863.jpeg",
    },
    {
        title: "Dragon sleeve",
        description: "Similar size and placement will take approximately 3 session (only outer side of the arm).",
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
        <>
            <SEO
                title="Flash Tattoo Designs"
                description="Browse available wanna-do flash tattoo designs by Nika Vera, including black and grey, color, ornamental and realism concepts."
                canonicalPath="/flash"
            />
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
        </>
    );
}

export default Flash;
