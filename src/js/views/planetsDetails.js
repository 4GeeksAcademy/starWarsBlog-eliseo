import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const PlanetDetails = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [details, setDetails] = useState(null);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/planets/${id}`) 
            .then(res => res.json())
            .then(data => setDetails(data.result))
            
            .catch(err => console.error(err));
    }, [id]);
    
    if (!details) return <div>Loading...</div>;

    return (
        <div className='card text-dark bg-warning m-5'>
            <h1 className='m-2'>{details.properties.name}</h1>
            <img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} className="card-img-top" alt={details.properties.name} />
            <div className='card-body'>
                <p>Population: {details.properties.population}</p>
                <p>Rotation period: {details.properties.rotation_period}</p>
                <p>Orbital period: {details.properties.orbital_period}</p>
                <p>Diameter: {details.properties.diameter}</p>
                <p>Terrain: {details.properties.terrain}</p>
                <p>Surface water: {details.properties.surface_water}</p>
                <p>Climate: {details.properties.climate}</p>
            </div>
        </div>
    );
};
