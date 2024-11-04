import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store } = useContext(Context);

    return (
        <nav className="navbar navbar-light bg-light mb-3">
            <Link to="/">
                <span className="navbar-brand mb-0 h1">Star Wars Blog</span>
            </Link>
            <div className="ml-auto">
                <Link to="/favorites">
                    <button className="btn btn-outline-warning">
                        Favorites ({store.favorites.length})
                    </button>
                </Link>
            </div>
        </nav>
    );
};

