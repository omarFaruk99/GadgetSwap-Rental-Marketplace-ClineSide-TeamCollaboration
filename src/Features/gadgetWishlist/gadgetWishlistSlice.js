import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserProfileDetails } from "../userProfileDetails/userProfileDetailsSlice.js";


const initialState = {
  wishlistGadgetDetails: [],
  wishlist: [],
  isLoading: false,
  isError: false,
  error: null,
};


export const getWishlistGadgetsDetails = createAsyncThunk(
  "gadgetWishlist/getWishlistGadgetsDetails",
  async ({ userEmail, axiosSecure }, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.post(
        `/gadgets/get_gadget_details_of_a_wishlist_array`,
        { userEmail }
      );
      const data = await response.data;
      if (data.status !== 200) throw new Error(data.message || "Failed to get wishlist gadgets details!");
      return data.data;
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const addOrRemoveWishlistGadget = createAsyncThunk(
  "gadgetWishlist/addOrRemoveWishlistGadget",
  async ({ userEmail, gadgetId, axiosSecure }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosSecure.patch(
        `/users/add_or_remove_a_gadget_id_to_or_from_wishlist`,
        { userEmail, gadgetId }
      );
      const data = await response.data;
      if (data.status !== 200) throw new Error(data.message || "Failed to add or remove gadget to wishlist!");

      // Dispatch getWishlistGadgetsDetails after success
      await Promise.all([
        await dispatch(getWishlistGadgetsDetails({ userEmail, axiosSecure })),
        await dispatch(getUserProfileDetails({ userEmail, axiosSecure }))
      ])

      return data.data;
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const gadgetWishlistSlice = createSlice({
  name: "gadgetWishlist",
  initialState,
  extraReducers: (builder) => {


    //To get the all gadget details from a user's wishlist array.
    builder.addCase(getWishlistGadgetsDetails.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(getWishlistGadgetsDetails.fulfilled, (state, action) => {
      state.wishlistGadgetDetails = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(getWishlistGadgetsDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload; // Use rejectWithValue message
    });


    //To add or remove a gadget id to or from a user's wishlist array.
    builder.addCase(addOrRemoveWishlistGadget.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(addOrRemoveWishlistGadget.fulfilled, (state, action) => {
      state.wishlist = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(addOrRemoveWishlistGadget.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload; // Use rejectWithValue message
    });
  },
});


export default gadgetWishlistSlice.reducer;