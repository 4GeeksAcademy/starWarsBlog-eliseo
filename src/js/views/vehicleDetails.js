import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const VehiclesDetails = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [details, setDetails] = useState(null);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/vehicles/${id}`) 
            .then(res => res.json())
            .then(data => setDetails(data.result))
            
            .catch(err => console.error(err));
    }, [id]);
    
    if (!details) return <div>Loading...</div>;

    return (
        <div className='card text-dark bg-warning m-5'>
            <h1 className='m-2'>{details.properties.name}</h1>
            <img src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`} className="card-img-top" alt={details.properties.name} />
            <div className='card-body'>
                <p>Model: {details.properties.model}</p>
                <p>Manufacturer: {details.properties.manufacturer}</p>
                <p>Class: {details.properties.vehicle_class}</p>
                <p>Cost: {details.properties.cost_in_credits}</p>
                <p>Speed: {details.properties.max_atmosphering_speed}</p>
                <p>Length: {details.properties.length}</p>
                <p>Passengers: {details.properties.passengers}</p>
            </div>
        </div>
    );
};
