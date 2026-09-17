import SEO from "../Components/SEO";
import tattoos from "../data/tattoos";
import PortfolioGallery from "./PortfolioGallery";

function BlackGreyPortfolio() {
    const blackGreyTattoos = tattoos.filter((tattoo) => tattoo.style === "black-grey");

    return (
        <>
            <SEO
                title="Black and Grey Tattoos"
                description="View black and grey tattoo work by Nika Vera, including realism, portraits, ornamental details and high-contrast compositions."
                canonicalPath="/portfolio/black-grey"
            />
            <PortfolioGallery
            title="✦Black & Grey Tattoos✦"
            tattoos={blackGreyTattoos}
            emptyText="Black and grey works will be added soon."
            variantClassName="portfolio-black-grey-page"
            />
        </>
    );
}

export default BlackGreyPortfolio;
