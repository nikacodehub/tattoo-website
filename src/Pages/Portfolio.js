import TattooCard from "../Components/TattooCard";

import "./Portfolio.css";

const tattoos = [
    {
        title: "Floral tattoo",
        description: "Delicate color flowers",
        image: "/images/IMG_3991.jpeg",
    },
    {
        title: "Black&Grey realism",
        description:"Custom tattoo",
        image: "/images/IMG_4012.jpeg",
    },
    {
        title:"Color realism",
        description: "Detailed realism work",
        image: "/images/IMG_4018.jpeg",
    },
     {
        title:"Color realism",
        description: "Detailed realism work",
        image: "/images/IMG_4020.jpeg",
    },
     {
        title:"Color realism",
        description: "Detailed realism work",
        image: "/images/IMG_7051.jpeg",
    },
     {
        title:"Color realism",
        description: "Detailed realism work",
        image: "/images/IMG_9307.jpeg",
    },
    
];

function Portfolio() {
    return (
        <main className="portfolio-page">
            <h1>Portfolio</h1>
            <section className="portfolio-grid">
                {tattoos.map((tattoo) =>(
                    <TattooCard
                    title={tattoo.title}
                    description={tattoo.description}
                    image={tattoo.image}
                    />
                ))}
                </section>
        </main>
    );
}

export default Portfolio;