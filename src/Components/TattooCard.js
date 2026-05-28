import "./TattooCard.css";

function TattooCard({title,description,image,onOpen}){
    return (
        <article className="tattoo-card">
            <button className="tattoo-card-preview" type="button" onClick={onOpen}>
                <img src={image} alt={title} className="tattoo-card-image" />
            </button>
            <div className="tattoo-card-content">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </article>
    );
}

export default TattooCard;
