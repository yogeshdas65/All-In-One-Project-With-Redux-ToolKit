import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktail } from "../redux/features/cocktailSlice";
import SpinnerAnim from "../components/shared/spinnerAnim";
import { Link } from "react-router-dom";
import SearchBox from "../components/SearchBox";

const Homepage = () => {
    const [modCocktails, setModCocktails] = useState([]);
    const { loading, cocktails, error } = useSelector((state) => ({
        ...state.app,
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCocktail());
    }, [dispatch]);

    useEffect(() => {
        if (cocktails) {
            const newCocktails = cocktails.map((item) => {
                const {
                    idDrink,
                    strAlcoholic,
                    strGlass,
                    strDrink,
                    strDrinkThumb,
                } = item;
                return {
                    id: idDrink,
                    name: strDrink,
                    img: strDrinkThumb,
                    info: strAlcoholic,
                    glass: strGlass,
                };
            });
            setModCocktails(newCocktails);
        } else {
            setModCocktails([]);
        }
    }, [cocktails]);

    const hoverStyles = {
        transition: "transform 0.3s ease, boxShadow 0.3s ease",
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
    };

    if (loading) {
        return <SpinnerAnim />;
    }

    if (error) {
        return <h1>{error.message}</h1>;
    }

    return (
        <Layout>
            <div className="container">
                <div className="row mt-3">
                    {modCocktails.map((item) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
                            <div className="card h-100">
                                <img
                                    src={item.img}
                                    className="card-img-top"
                                    alt={item.name}
                                    style={{ ...hoverStyles, height: "350px", objectFit: "cover" }}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{item.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{item.glass}</h6>
                                    <p className="card-text">{item.info}</p>
                                    <Link
                                        to={`/products/${item.id}`}
                                        className="btn btn-primary mt-auto"
                                    >
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Homepage;
