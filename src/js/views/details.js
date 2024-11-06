import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext'; // Import context

export const Details = () => {
    const { id, type } = useParams(); // Get the ID and type from the URL
    const { store, actions } = useContext(Context); // Get store and actions from context
    const [details, setDetails] = useState(null);

    // Helper function to fetch data for different types (people, planets, vehicles)
    const fetchDetails = async () => {
        try {
            let url = '';

            if (type === 'character') {
                url = `https://www.swapi.tech/api/people/${id}`;
            } else if (type === 'planet') {
                url = `https://www.swapi.tech/api/planets/${id}`;
            } else if (type === 'vehicle') {
                url = `https://www.swapi.tech/api/vehicles/${id}`;
            }

            const response = await fetch(url);
            const data = await response.json();
            setDetails(data.result);
        } catch (error) {
            console.error('Error fetching details:', error);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id, type]);

    if (!details) return <div>Loading...</div>;

    const isFavorite = store.favorites.some(fav => fav.uid === id && fav.type === type);

    return (
        <div className='card text-dark bg-warning m-5'>
            <h1 className='m-2'>{details.properties.name || details.properties.title}</h1>
            <img
                src={`https://starwars-visualguide.com/assets/img/${type}s/${id}.jpg`}
                onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
                className="card-img-top"
                alt={details.properties.name || details.properties.title}
            />
            <div className='card-body'>
                <p>{type === 'character' && `Birth Year: ${details.properties.birth_year}`}</p>
                <p>{type === 'character' && `Height: ${details.properties.height}`}</p>
                <p>{type === 'character' && `Gender: ${details.properties.gender}`}</p>
                <p>{type === 'character' && `Mass: ${details.properties.mass}`}</p>
                <p>{type === 'character' && `Hair color: ${details.properties.hair_color}`}</p>
                <p>{type === 'character' && `Skin color: ${details.properties.skin_color}`}</p>

                <p>{type === 'planet' && `Climate: ${details.properties.climate}`}</p>
                <p>{type === 'planet' && `Terrain: ${details.properties.terrain}`}</p>
                <p>{type === 'planet' && `Population: ${details.properties.population}`}</p>

                <p>{type === 'vehicle' && `Model: ${details.properties.model}`}</p>
                <p>{type === 'vehicle' && `Manufacturer: ${details.properties.manufacturer}`}</p>
                <p>{type === 'vehicle' && `Cargo capacity: ${details.properties.cargo_capacity}`}</p>
                <p>{type === 'vehicle' && `Length: ${details.properties.length}`}</p>
            </div>

            <button
                onClick={() => actions.toggleFavorite({ uid: id, name: details.properties.name || details.properties.title, type })}
                className={`btn ${isFavorite ? "btn-danger" : "btn-outline-primary"}`}
            >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
        </div>
    );
};
