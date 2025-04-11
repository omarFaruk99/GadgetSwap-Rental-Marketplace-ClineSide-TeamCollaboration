import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../SharedUtilities/SharedUtilities.jsx";


const initialState = {
    userProfileDetails: {},
    isLoading: false,
    isError: false,
    error: null,
};


export const getUserProfileDetails = createAsyncThunk(
    "userProfileDetails/getUserProfileDetails",
    async (userEmail, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/users/get_full_user_profile_details`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userEmail }),
            });
            const data = await response.json();
            if (data.status !== 200) throw new Error(data.message || "Failed to get full user profile details!");
            return data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const userProfileDetailsSlice = createSlice({
    name: "userProfileDetails",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUserProfileDetails.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(getUserProfileDetails.fulfilled, (state, action) => {
            state.userProfileDetails = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(getUserProfileDetails.rejected, (state, action) => {
            state.userProfileDetails = {}; // Reset to avoid stale data
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        });
    },
});


export default userProfileDetailsSlice.reducer;