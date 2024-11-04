import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";

const VehicleCard = (props) => {
    const { actions, store } = useContext(Context);
    // Check if the current item is a favorite
    const isFavorite = store.favorites.some(fav => fav.uid === props.uid && fav.type === props.type);

    const navigate = useNavigate();
    const handleDetailsClick = () => {
        navigate(`/details/${props.type}/${props.uid}`);
    };

    return (
        <div className="card text-dark bg-warning m-2" style={{ minWidth: "13rem" }}>
            <img src={`https://starwars-visualguide.com/assets/img/vehicles/${props.uid}.jpg`} className="card-img-top" alt={props.name} />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <button className={'btn btn-outline-secondary m-2'} onClick={handleDetailsClick}>View Details</button>
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

export default VehicleCard;
