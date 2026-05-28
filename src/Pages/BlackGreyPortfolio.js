import tattoos from "../data/tattoos";
import PortfolioGallery from "./PortfolioGallery";

function BlackGreyPortfolio() {
    const blackGreyTattoos = tattoos.filter((tattoo) => tattoo.style === "black-grey");

    return (
        <PortfolioGallery
            title="Black & Grey Tattoos"
            tattoos={blackGreyTattoos}
            emptyText="Black and grey works will be added soon."
            variantClassName="portfolio-black-grey-page"
        />
    );
}

export default BlackGreyPortfolio;
