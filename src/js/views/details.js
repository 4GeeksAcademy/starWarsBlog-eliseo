import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Details = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [details, setDetails] = useState(null);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/people/${id}`) 
            .then(res => res.json())
            .then(data => setDetails(data.result))
            
            .catch(err => console.error(err));
    }, [id]);
    
    if (!details) return <div>Loading...</div>;

    return (
        <div className='card text-dark bg-warning m-5'>
            <h1 className='m-2'>{details.properties.name}</h1>
            <img src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} className="card-img-top" alt={details.properties.name} />
            <div className='card-body'>
                <p>Birth Year: {details.properties.birth_year}</p>
                <p>Height: {details.properties.height}</p>
                <p>Gender: {details.properties.gender}</p>
                <p>Mass: {details.properties.mass}</p>
                <p>Hair color: {details.properties.hair_color}</p>
                <p>Skin color: {details.properties.skin_color}</p>
            </div>
        </div>
    );
};
