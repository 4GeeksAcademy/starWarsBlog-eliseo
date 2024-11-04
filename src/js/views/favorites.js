import React, { useContext } from "react";
import { Context } from "../store/appContext";
import VehicleCard from "../component/vehicleCard";
import PlanetCard from "../component/planetCard";
import Card from "../component/card";

export const Favorites = () => {
    const { store } = useContext(Context);
    console.warn(store.favorites);

    return (
        <div className="container">
            <h1>Your Favorites</h1>
            <div className="d-flex flex-wrap">
                {store.favorites.length > 0 ? (
                    store.favorites.map((item) => {
                        // Conditional rendering based on type
                        switch (item.type) {
                            case "character":
                                return (
                                    <Card key={item.uid} name={item.name} uid={item.uid} />
                                );
                            case "planet":
                                return (
                                    <PlanetCard key={item.uid} name={item.name} uid={item.uid} />
                                );
                            case "vehicle":
                                return (
                                    <VehicleCard key={item.uid} name={item.name} uid={item.uid} />
                                )
                        
                        }
                    })
                ) : (
                    <p>No favorites added yet.</p>
                )}
            </div>
        </div>
    );

};
