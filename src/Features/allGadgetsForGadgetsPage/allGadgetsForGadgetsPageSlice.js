import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BASE_URL} from "../../SharedUtilities/SharedUtilities.jsx";


// Define the initial state for the gadgets slice
const initialState = {
    allGadgets: [],
    isLoading: false,
    isError: false,
    error: null,
}


export const fetchAllGadgets = createAsyncThunk(
    'allGadgetsForGadgetsPage/fetchAllGadgets',
    async () => {
        const response = await fetch(`${BASE_URL}/gadgets/get_all_gadgets_for_gadgets_page`, {});
        return await response.json();
    }
)


const allGadgetsForGadgetsPageSlice = createSlice({
    name: 'allGadgetsForGadgetsPage',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAllGadgets.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        });
        builder.addCase(fetchAllGadgets.fulfilled, (state, action) => {
            state.allGadgets = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchAllGadgets.rejected, (state, action) => {
            state.isError = true;
            state.error = action.error?.message;
            state.isLoading = false;
        });
    }
})


export default allGadgetsForGadgetsPageSlice.reducer;
