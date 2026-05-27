import TattooCard from "../Components/TattooCard";

import "./Portfolio.css";

const tattoos = [
    {
        title: "Floral tattoo",
        description: "Delicate color flowers"
    },
    {
        title: "Black&Grey realism",
        description:"Custom tattoo"
    },
    {
        title:"Color realism",
        description: "Detailed realism work"
    },
     {
        title:"Color realism",
        description: "Detailed realism work"
    },
     {
        title:"Color realism",
        description: "Detailed realism work"
    },
     {
        title:"Color realism",
        description: "Detailed realism work"
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
                    />
                ))}
                </section>
        </main>
    );
}

export default Portfolio;