import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchCocktails } from "../redux/features/cocktailSlice";

const SearchBox = () => {
  const [search, setSearch] = useState("");
  const searchTermRef = useRef(null);
  const dispatch = useDispatch();

  const handleChange = () => {
    const searchText = searchTermRef.current.value;
    dispatch(fetchSearchCocktails({searchText}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center mt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 flex">
            <input
              type="text"
              ref={searchTermRef}
              // value={searchTerm}
              onChange={handleChange}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Search Here"
              style={{ width: "350px" }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchBox;
