import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CgTally } from "react-icons/cg";
import { fetchSearchCocktails } from "../redux/features/cocktailSlice";
import { useDispatch } from "react-redux";

const Header = () => {
    const [search, setSearch] = useState("");
    const searchTermRef = useRef(null);
    const dispatch = useDispatch();

    const handleChange = () => {
       
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchText = searchTermRef.current.value;
        dispatch(fetchSearchCocktails({ searchText }));
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <CgTally color="red" /> LiquidLuxe 
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo02"
                        aria-controls="navbarTogglerDemo02"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarTogglerDemo02"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    to="/home"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link disabled" to="/disabled">
                                    Disabled
                                </Link>
                            </li>
                        </ul>
                        <form onSubmit={handleSubmit} className="d-flex">
                            <input
                                className="form-control me-2"
                                type="text"
                                ref={searchTermRef}
                                onChange={handleChange}
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button
                                className="btn btn-outline-success"
                                type="submit"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
