import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../SharedUtilities/SharedUtilities.jsx";

const initialState = {
  featuredGadgets: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const fetchFeaturedGadgets = createAsyncThunk(
  "featuredGadgetsForHomePage/fetchFeaturedGadgets",
  async () => {
    const response = await fetch(
      `${BASE_URL}/gadgets/featured_gadgets_for_home_page`,
      {}
    );
    return await response.json();
  }
);

const featuredGadgetsForHomePageSlice = createSlice({
  name: "featuredGadgetsForHomePage",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchFeaturedGadgets.pending, (state) => {
      // state.isError = false;
      // state.isLoading = true;
      state.featuredGadgets = [];
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchFeaturedGadgets.fulfilled, (state, action) => {
      state.featuredGadgets = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchFeaturedGadgets.rejected, (state, action) => {
      state.isError = true;
      state.error = action.error?.message;
      state.isLoading = false;
    });
  },
});

export default featuredGadgetsForHomePageSlice.reducer;
