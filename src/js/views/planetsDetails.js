import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext'; // Import context

export const PlanetDetails = () => {
    const { id } = useParams(); // Get the ID from the URL
    const { store, actions } = useContext(Context); // Get store and actions from context
    const [details, setDetails] = useState(null);

    // Helper function to fetch planet details
    const fetchPlanetDetails = async () => {
        try {
            const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
            const data = await response.json();
            setDetails(data.result);
        } catch (error) {
            console.error('Error fetching planet details:', error);
        }
    };

    useEffect(() => {
        fetchPlanetDetails();
    }, [id]);

    if (!details) return <div>Loading...</div>;

    const isFavorite = store.favorites.some(fav => fav.uid === id && fav.type === 'planet');

    return (
        <div className='card text-dark bg-warning m-5'>
            <h1 className='m-2'>{details.properties.name}</h1>
            <img
                src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
                className="card-img-top"
                alt={details.properties.name}
            />
            <div className='card-body'>
                <p>Population: {details.properties.population}</p>
                <p>Rotation period: {details.properties.rotation_period}</p>
                <p>Orbital period: {details.properties.orbital_period}</p>
                <p>Diameter: {details.properties.diameter}</p>
                <p>Terrain: {details.properties.terrain}</p>
                <p>Surface water: {details.properties.surface_water}</p>
                <p>Climate: {details.properties.climate}</p>
            </div>

            <button
                onClick={() => actions.toggleFavorite({ uid: id, name: details.properties.name, type: 'planet' })}
                className={`btn ${isFavorite ? "btn-danger" : "btn-outline-primary"}`}
            >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
        </div>
    );
};
