import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGadgetDetails } from "../getGadgetDetailsById/getGadgetDetailsByIdSlice";


const initialState = {
    userRentalOrders: [],
    isLoading: false,
    isError: false,
    error: null,
};


export const getUserRentalOrders = createAsyncThunk(
    "userRentalOrders/getUserRentalOrders",
    async ({ userEmail, axiosSecure }, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.post(
                `/rental_orders/get_all_rental_orders_of_a_user`,
                { userEmail }
            );
            const data = response?.data;
            //console.log(data?.data)
            if (data?.status !== 200) throw new Error(data?.message || "Failed to get user's rental orders!");
            return data?.data;
        }
        catch (error) {
            return rejectWithValue(error?.message || "Network error while fetching user's rental orders");
        }
    }
);


export const addANewRentalOrderForThisUser = createAsyncThunk(
    "userRentalOrders/addANewRentalOrderForThisUser",
    async ({ userEmail, gadgetId, newRentalOrderObj, axiosSecure }, { rejectWithValue, dispatch }) => {
        try {
            const response = await axiosSecure.post(
                `/rental_orders/add_new_rental_order_from_a_user`,
                { userEmail, newRentalOrderObj }
            );
            const data = response.data;
            // console.log(data)
            if (data.status !== 200) throw new Error(data.message || "Failed to add new rental order for this user!");

            await dispatch(fetchGadgetDetails(gadgetId))
            return data.data;
        }
        catch (error) {
            return rejectWithValue(error.message || "Network error while adding new rental order for this user");
        }
    }
);


const userRentalOrdersSlice = createSlice({
    name: "userRentalOrders",
    initialState,
    extraReducers: (builder) => {
        builder

            //To get all the rental orders from a user.
            .addCase(getUserRentalOrders.pending, (state) => {
                state.userRentalOrders = [];
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(getUserRentalOrders.fulfilled, (state, action) => {
                state.userRentalOrders = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.error = null;
            })
            .addCase(getUserRentalOrders.rejected, (state, action) => {
                state.userRentalOrders = [];
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })


            //To add a new rental order for this user.
            .addCase(addANewRentalOrderForThisUser.pending, (state) => {
                state.userRentalOrders = [];
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(addANewRentalOrderForThisUser.fulfilled, (state, action) => {
                state.userRentalOrders = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.error = null;
            })
            .addCase(addANewRentalOrderForThisUser.rejected, (state, action) => {
                state.userRentalOrders = [];
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });
    },
});


export default userRentalOrdersSlice.reducer;