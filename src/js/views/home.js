import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import Card from "../component/card";
import PlanetCard from "../component/planetCard";
import VehicleCard from "../component/vehicleCard";
import SearchBar from "../component/searchBar";

export const Home = () => {
    const [people, setPeople] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    // Helper function to fetch data if not cached
    const fetchData = async (url, setState, key) => {
        const cachedData = localStorage.getItem(key);
        if (cachedData) {
            setState(JSON.parse(cachedData));
        } else {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setState(data.results);
                localStorage.setItem(key, JSON.stringify(data.results));
            } catch (error) {
                console.error(`Error fetching ${key}:`, error);
            }
        }
    };

    useEffect(() => {
        fetchData("https://www.swapi.tech/api/people", setPeople, "peopleData");
    }, []);

    useEffect(() => {
        fetchData("https://www.swapi.tech/api/planets", setPlanets, "planetsData");
    }, []);

    useEffect(() => {
        fetchData("https://www.swapi.tech/api/vehicles", setVehicles, "vehiclesData");
    }, []);

    return (
        <div className="text-center mt-5">
            <h1 className="text-warning">Star Wars API</h1>
			<SearchBar /> {/* Add the SearchBar here */}
            <div className="container d-flex flex-row" style={{ overflowX: "scroll" }}>
                {people.map((item, index) => (
                    <Card key={index} name={item.name} uid={item.uid} type="character" />
                ))}
            </div>
            <div className="container d-flex flex-row" style={{ overflowX: "scroll" }}>
                {planets.map((item, index) => (
                    <PlanetCard key={index} name={item.name} uid={item.uid} type="planet" />
                ))}
            </div>
            <div className="container d-flex flex-row" style={{ overflowX: "scroll" }}>
                {vehicles.map((item, index) => (
                    <VehicleCard key={index} name={item.name} uid={item.uid} type="vehicle" />
                ))}
            </div>
        </div>
    );
};
