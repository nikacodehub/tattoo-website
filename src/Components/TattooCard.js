import "./TattooCard.css";

function TattooCard({title,description}){
    return (
        <article className="tattoo-card">
            <div clssName="tattoo-card-image"></div>
            <h3>{title}</h3>
            <p>{description}</p>
        </article>
    );
}

export default TattooCard;
