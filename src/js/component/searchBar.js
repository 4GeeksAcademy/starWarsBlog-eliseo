import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const { store } = useContext(Context);
    const navigate = useNavigate();

    const fetchSearchResults = async () => {
        if (!query.trim()) {
            setFilteredResults([]);
            return;
        }

        // Clear results before loading new data to avoid showing stale results
        setFilteredResults([]);

        try {
            const timestamp = Date.now(); // Timestamp to bypass caching

            const characterResponse = await fetch(`https://www.swapi.tech/api/people?search=${query}&_=${timestamp}`);
            const characterData = await characterResponse.json();
            const characters = characterData.results ? characterData.results.map(item => ({ ...item, type: "character" })) : [];

            const planetResponse = await fetch(`https://www.swapi.tech/api/planets?search=${query}&_=${timestamp}`);
            const planetData = await planetResponse.json();
            const planets = planetData.results ? planetData.results.map(item => ({ ...item, type: "planet" })) : [];

            const vehicleResponse = await fetch(`https://www.swapi.tech/api/vehicles?search=${query}&_=${timestamp}`);
            const vehicleData = await vehicleResponse.json();
            const vehicles = vehicleData.results ? vehicleData.results.map(item => ({ ...item, type: "vehicle" })) : [];

            setFilteredResults([...characters, ...planets, ...vehicles]);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setFilteredResults([]);
        }
    };

    useEffect(() => {
        if (query) {
            const timeoutId = setTimeout(fetchSearchResults, 300); // Debounce the API call
            return () => clearTimeout(timeoutId);
        } else {
            setFilteredResults([]);
        }
    }, [query]);

    const handleSelectItem = (type, uid) => {
        navigate(`/details/${type}/${uid}`);
        setQuery("");
        setFilteredResults([]);
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
