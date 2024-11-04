import React, { useContext } from "react";
import { Context } from "../store/appContext";

const FavoritesDropdown = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle me-2"
                type="button"
                id="favoritesDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Favorites <span className="badge bg-primary">{store.favorites.length}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
                {store.favorites.length > 0 ? (
                    store.favorites.map((item, index) => (
                        <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                            <span>{item.name}</span>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => actions.toggleFavorite(item)} // Pass the full item object here
                            >
                                Remove
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="dropdown-item text-muted">No favorites added</li>
                )}
            </ul>
        </div>
    );
};

export default FavoritesDropdown;

