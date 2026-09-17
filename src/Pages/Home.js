import HeroSection from"../Components/HeroSection";
import SEO from "../Components/SEO";


function Home() {
    return (
        <>
            <SEO
                title="Tattoo Artist in Reykjavik"
                description="Nika Vera Tattoo creates custom color, black and grey realism, ornamental and expressive tattoo work in Reykjavik, Iceland."
                canonicalPath="/"
            />
            <HeroSection />
        </>
    );
}

export default Home;
