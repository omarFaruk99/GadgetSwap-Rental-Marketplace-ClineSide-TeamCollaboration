import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic.jsx";


const initialState = {
  gadgetDetails: null,
  isLoading: false,
  isError: false,
  error: null,
}


export const fetchGadgetDetails = createAsyncThunk(
  "getGadgetDetailsById/fetchGadgetDetails",
  async (id, { rejectWithValue }) => {
    try {
      const axiosPublic = useAxiosPublic();
      const response = await axiosPublic.get(`/gadgets/get_gadget_details_by_id/${id}`, {});
      if (response?.data?.status !== 200)
        throw new Error(response?.data?.message || "Failed to fetch gadget details");
      return response?.data?.data;
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const getGadgetDetailsByIdSlice = createSlice({
  name: 'getGadgetDetailsById',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchGadgetDetails.pending, (state) => {
      state.gadgetDetails = null;
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchGadgetDetails.fulfilled, (state, action) => {
      state.gadgetDetails = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchGadgetDetails.rejected, (state, action) => {
      state.gadgetDetails = null;
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    })
  }
})


export default getGadgetDetailsByIdSlice.reducer;