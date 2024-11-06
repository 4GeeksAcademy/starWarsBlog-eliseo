import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext'; // Import context

export const VehiclesDetails = () => {
    const { id } = useParams(); // Get the ID from the URL
    const { store, actions } = useContext(Context); // Get store and actions from context
    const [details, setDetails] = useState(null);

    // Helper function to fetch vehicle details
    const fetchVehicleDetails = async () => {
        try {
            const response = await fetch(`https://www.swapi.tech/api/vehicles/${id}`);
            const data = await response.json();
            setDetails(data.result);
        } catch (error) {
            console.error('Error fetching vehicle details:', error);
        }
    };

    useEffect(() => {
        fetchVehicleDetails();
    }, [id]);

    if (!details) return <div>Loading...</div>;

    const isFavorite = store.favorites.some(fav => fav.uid === id && fav.type === 'vehicle');

    return (
        <div className='card text-dark bg-warning m-5'>
            <h1 className='m-2'>{details.properties.name}</h1>
            <img
                src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`}
                onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
                className="card-img-top"
                alt={details.properties.name}
            />
            <div className='card-body'>
                <p>Model: {details.properties.model}</p>
                <p>Manufacturer: {details.properties.manufacturer}</p>
                <p>Class: {details.properties.vehicle_class}</p>
                <p>Cost: {details.properties.cost_in_credits}</p>
                <p>Speed: {details.properties.max_atmosphering_speed}</p>
                <p>Length: {details.properties.length}</p>
                <p>Passengers: {details.properties.passengers}</p>
            </div>

            <button
                onClick={() => actions.toggleFavorite({ uid: id, name: details.properties.name, type: 'vehicle' })}
                className={`btn ${isFavorite ? "btn-danger" : "btn-outline-primary"}`}
            >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
        </div>
    );
};
