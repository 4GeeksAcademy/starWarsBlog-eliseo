import React, { useContext } from "react";
import { Context } from "../store/appContext";

const PlanetCard = (props) => {
    const { actions, store } = useContext(Context);
    // Check if the current item is a favorite
    const isFavorite = store.favorites.some(fav => fav.uid === props.uid && fav.type === props.type);

    return (
        <div className="card" style={{ minWidth: "13rem" }}>
            <img src={`https://starwars-visualguide.com/assets/img/planets/${props.uid}.jpg`} className="card-img-top" alt={props.name} />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <button
                    onClick={() => actions.toggleFavorite({ uid: props.uid, name: props.name, type: props.type })} // Ensure type is passed
                    className={`btn ${isFavorite ? "btn-danger" : "btn-outline-primary"}`}
                >
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
            </div>
        </div>
    );
};

export default PlanetCard;
