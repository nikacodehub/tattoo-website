import SEO from "../Components/SEO";
import tattoos from "../data/tattoos";
import PortfolioGallery from "./PortfolioGallery";

function ColorPortfolio() {
    const colorTattoos = tattoos.filter((tattoo) => tattoo.style === "color");

    return (
        <>
            <SEO
                title="Color Tattoos"
                description="View color tattoo work by Nika Vera, including vivid realism, illustrative pieces, portraits and expressive custom designs."
                canonicalPath="/portfolio/color"
            />
            <PortfolioGallery
            title="✦Color Tattoos✦"
            tattoos={colorTattoos}
            emptyText="Color works will be added soon."
            variantClassName="portfolio-color-page"
            />
        </>
    );
}

export default ColorPortfolio;
