import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { fetchSingleCocktails } from "../redux/features/cocktailSlice";
import SpinnerAnim from "../components/shared/spinnerAnim";

const ProductDetails = () => {
  const [modifendCocktail, setmodifendCocktail] = useState(null);
  const { loading, cocktail } = useSelector(
    (state) => ({ ...state.app })
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  // console.log("useParams",id)

  useEffect(() => {
    dispatch(fetchSingleCocktails({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (cocktail && cocktail.length > 0) {
      const {
        strDrink: name,
        strCategory: category,
        strAlcoholic: info,
        strGlass: glass,
        strDrinkThumb: img,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      } = cocktail[0];
      const ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      ].filter(Boolean); // Filters out any null or undefined values
      const newCocktail = { name, category, info, glass, img, ingredients };
      setmodifendCocktail(newCocktail);
    } else {
      setmodifendCocktail(null);
    }
  }, [cocktail]);

  if (!modifendCocktail) {
    return <h2>No Cocktail Details</h2>;
  }

  const { name, img, info, category, glass, ingredients } = modifendCocktail;

  return (
    <>
      {loading ? (
        <SpinnerAnim />
      ) : (
        <Layout>
          <div className="container mt-4">
            <Link to="/" className="btn btn-info">
              GO BACK
            </Link>
            <div className="row mt-4">
              <div className="col-md-5">
                <img
                  src={img}
                  alt={name}
                  height={300}
                  width={400}
                />
              </div>
              <div className="col-md-5">
                <h2>Name: {name}</h2>
                <p className="mt-1">Category: {category}</p>
                <p>Info: {info}</p>
                <p>Glass: {glass}</p>
                <p>
                  Ingredients: {ingredients.map((ingredient, index) => (
                    <span key={index}>
                      {ingredient}
                      {index < ingredients.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default ProductDetails;
