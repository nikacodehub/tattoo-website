import "./TattooCard.css";

function TattooCard({title,description,image}){
    return (
        <article className="tattoo-card">
            <img src={image} alt={title} className="tattoo-card-image" />
            <div className="tattoo-card-content"></div>
            <h3>{title}</h3>
            <p>{description}</p>
        </article>
    );
}

export default TattooCard;
