import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCocktail = createAsyncThunk(
  "cocktails/fetchCocktails",
  async () => {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"
    );
    const data = await response.json();
    return data.drinks; // Accessing the 'drinks' array directly from the response
  }
);

export const fetchSingleCocktails = createAsyncThunk(
  "cocktails/fetchsingleCocktails",
  async ({ id }) => {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    return data.drinks;
  }
);

export const fetchSearchCocktails = createAsyncThunk(
  "cocktails/fetchsearchCocktails",
  async ({ searchText }) => {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`
    );
    const data = await response.json();
    return data.drinks;
  }
);

const cocktailSlice = createSlice({
  name: "cocktails",
  initialState: {
    loading: false,
    cocktails: [],
    error: null,
    cocktail: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCocktail.fulfilled, (state, action) => {
        state.loading = false;
        state.cocktails = action.payload || [];
      })
      .addCase(fetchCocktail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSingleCocktails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleCocktails.fulfilled, (state, action) => {
        state.loading = false;
        state.cocktail = action.payload || [];
      })
      .addCase(fetchSingleCocktails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSearchCocktails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchCocktails.fulfilled, (state, action) => {
        state.loading = false;
        state.cocktails = action.payload || [];
      })
      .addCase(fetchSearchCocktails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cocktailSlice.reducer;
