import tattoos from "../data/tattoos";
import PortfolioGallery from "./PortfolioGallery";

function ColorPortfolio() {
    const colorTattoos = tattoos.filter((tattoo) => tattoo.style === "color");

    return (
        <PortfolioGallery
            title="Color Tattoos"
            tattoos={colorTattoos}
            emptyText="Color works will be added soon."
            variantClassName="portfolio-color-page"
        />
    );
}

export default ColorPortfolio;
