import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Details = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [details, setDetails] = useState(null);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/people/${id}`) // Adjust the API endpoint based on the type of entity
            .then(res => res.json())
            .then(data => setDetails(data.result))
            
            .catch(err => console.error(err));
    }, [id]);
    
    if (!details) return <div>Loading...</div>;

    return (
        <div>
            <h1>{details.properties.name}</h1>
            {/* Display more details here */}
            <p>Height: {details.properties.height}</p>
            <p>Mass: {details.properties.mass}</p>
            {/* Add other details as needed */}
        </div>
    );
};
