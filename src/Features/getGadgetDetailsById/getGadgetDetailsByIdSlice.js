import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BASE_URL} from "../../SharedUtilities/SharedUtilities.jsx";


const initialState = {
    gadgetDetails: null,
    isLoading: false,
    isError: false,
    error: null,
}


export const fetchGadgetDetails = createAsyncThunk(
    'gadgetDetailsById/fetchGadgetDetails',
    async (id) => {
        const response = await fetch(`${BASE_URL}/gadgets/get_gadget_details_by_id/${id}`, {});
        return await response.json();
    }
)


const gadgetDetailsByIdSlice = createSlice({
    name: 'gadgetDetailsById',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchGadgetDetails.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        });
        builder.addCase(fetchGadgetDetails.fulfilled, (state, action) => {
            state.gadgetDetails = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchGadgetDetails.rejected, (state, action) => {
            state.isError = true;
            state.error = action.error?.message;
            state.isLoading = false;
        })
    }
})


export default gadgetDetailsByIdSlice.reducer;
