import {useCallback, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

import TattooCard from "../Components/TattooCard";
import "./Portfolio.css";

function PortfolioGallery({title, tattoos, emptyText, variantClassName = ""}) {
    const portfolioRef = useRef(null);
    const [selectedTattooIndex, setSelectedTattooIndex] = useState(null);
    const selectedTattoo = selectedTattooIndex === null ? null : tattoos[selectedTattooIndex];

    function handleMouseMove(event) {
        const rect = portfolioRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        portfolioRef.current.style.setProperty("--x", `${x}px`);
        portfolioRef.current.style.setProperty("--y", `${y}px`);
    }

    const showPreviousTattoo = useCallback(() => {
        setSelectedTattooIndex((currentIndex) => {
            if (currentIndex === null) {
                return null;
            }

            return currentIndex === 0 ? tattoos.length - 1 : currentIndex - 1;
        });
    }, [tattoos.length]);

    const showNextTattoo = useCallback(() => {
        setSelectedTattooIndex((currentIndex) => {
            if (currentIndex === null) {
                return null;
            }

            return currentIndex === tattoos.length - 1 ? 0 : currentIndex + 1;
        });
    }, [tattoos.length]);

    useEffect(() => {
        function handleKeyDown(event) {
            if (selectedTattooIndex === null) {
                return;
            }

            if (event.key === "Escape") {
                setSelectedTattooIndex(null);
            }

            if (event.key === "ArrowLeft") {
                showPreviousTattoo();
            }

            if (event.key === "ArrowRight") {
                showNextTattoo();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedTattooIndex, showNextTattoo, showPreviousTattoo]);

    return (
        <main
            ref={portfolioRef}
            className={`portfolio-page portfolio-gallery-page ${variantClassName}`}
            onMouseMove={handleMouseMove}
        >
            <Link to="/portfolio" className="portfolio-back-link">
                Back to portfolio
            </Link>

            <h2>{title}</h2>

            {tattoos.length > 0 ? (
                <section className="portfolio-grid">
                    {tattoos.map((tattoo, index) => (
                        <TattooCard
                            key={tattoo.image}
                            title={tattoo.title}
                            description={tattoo.description}
                            image={tattoo.image}
                            onOpen={() => setSelectedTattooIndex(index)}
                        />
                    ))}
                </section>
            ) : (
                <p className="portfolio-empty">{emptyText}</p>
            )}

            {selectedTattoo && (
                <div className="portfolio-lightbox" onClick={() => setSelectedTattooIndex(null)}>
                    <button className="portfolio-lightbox-close" type="button" aria-label="Close image" />
                    <button
                        className="portfolio-lightbox-arrow portfolio-lightbox-arrow-left"
                        type="button"
                        aria-label="Previous image"
                        onClick={(event) => {
                            event.stopPropagation();
                            showPreviousTattoo();
                        }}
                    />
                    <div className="portfolio-lightbox-content" onClick={(event) => event.stopPropagation()}>
                        <p className="portfolio-lightbox-count">
                            {selectedTattooIndex + 1} / {tattoos.length}
                        </p>
                        <img src={selectedTattoo.image} alt={selectedTattoo.title} />
                        <h2>{selectedTattoo.title}</h2>
                        <p>{selectedTattoo.description}</p>
                    </div>
                    <button
                        className="portfolio-lightbox-arrow portfolio-lightbox-arrow-right"
                        type="button"
                        aria-label="Next image"
                        onClick={(event) => {
                            event.stopPropagation();
                            showNextTattoo();
                        }}
                    />
                </div>
            )}
        </main>
    );
}

export default PortfolioGallery;
