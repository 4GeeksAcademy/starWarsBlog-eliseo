import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const navigate = useNavigate();

    // Fetch data directly from API based on query
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query.trim()) {
                setFilteredResults([]);
                return;
            }

            try {
                const characterResponse = await fetch(`https://www.swapi.tech/api/people?search=${query}`);
                const characterData = await characterResponse.json();
                const characters = characterData.results.map(item => ({ ...item, type: "character" }));

                const planetResponse = await fetch(`https://www.swapi.tech/api/planets?search=${query}`);
                const planetData = await planetResponse.json();
                const planets = planetData.results.map(item => ({ ...item, type: "planet" }));

                const vehicleResponse = await fetch(`https://www.swapi.tech/api/vehicles?search=${query}`);
                const vehicleData = await vehicleResponse.json();
                const vehicles = vehicleData.results.map(item => ({ ...item, type: "vehicle" }));

                // Combine all results and update the state
                setFilteredResults([...characters, ...planets, ...vehicles]);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        fetchSearchResults();
    }, [query]);

    const handleSelectItem = (type, uid) => {
        navigate(`/details/${type}/${uid}`);
        setQuery(""); // Clear the query after navigation
        setFilteredResults([]); // Clear autocomplete suggestions
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                className="form-control"
                placeholder="Search characters, planets, or vehicles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {filteredResults.length > 0 && (
                <ul className="autocomplete-list">
                    {filteredResults.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelectItem(item.type, item.uid)}
                            className="autocomplete-item"
                        >
                            {item.name} <span className="badge badge-secondary">{item.type}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;