import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import Card from "../component/card";
import PlanetCard from "../component/planetCard";
import VehicleCard from "../component/vehicleCard";
import SearchBar from "../component/searchBar";
import { Context } from "../store/appContext";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // Call fetch functions from actions only if data is not already in the store
        if (!store.characters.length) actions.fetchCharacters();
        if (!store.planets.length) actions.fetchPlanets();
        if (!store.vehicles.length) actions.fetchVehicles();
    }, [store.characters, store.planets, store.vehicles, actions]);

    return (
        <div className="text-center mt-5">
            <h1 className="text-warning">Star Wars API</h1>
            <SearchBar /> {/* Add the SearchBar here */}
            <div className="container d-flex flex-row" style={{ overflowX: "scroll" }}>
                {store.characters.map((item, index) => (
                    <Card key={index} name={item.name} uid={item.uid} type="character" />
                ))}
            </div>
            <div className="container d-flex flex-row" style={{ overflowX: "scroll" }}>
                {store.planets.map((item, index) => (
                    <PlanetCard key={index} name={item.name} uid={item.uid} type="planet" />
                ))}
            </div>
            <div className="container d-flex flex-row" style={{ overflowX: "scroll" }}>
                {store.vehicles.map((item, index) => (
                    <VehicleCard key={index} name={item.name} uid={item.uid} type="vehicle" />
                ))}
            </div>
        </div>
    );
};
