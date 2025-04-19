import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    userProfileDetails: {},
    isLoading: false,
    isError: false,
    error: null,
};


export const getUserProfileDetails = createAsyncThunk(
    "userProfileDetails/getUserProfileDetails",
    async ({ userEmail, axiosSecure }, { rejectWithValue }) => {
      try {
        const { data } = await axiosSecure.post("/users/get_full_user_profile_details", {
          userEmail,
        });
  
        if (data.status !== 200) {
          throw new Error(data.message || "Failed to get full user profile details!");
        }
  
        return data.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  


export const updateUserProfileInfo = createAsyncThunk(
    "userProfileDetails/updateUserProfileInfo",
    async ({ userEmail, userInfoObj, axiosSecure }, { rejectWithValue }) => {
      try {
        const { data } = await axiosSecure.patch("/users/update_user_profile_info", {
          userEmail,
          userInfoObj,
        });
  
        if (data.status !== 200) {
          throw new Error(data.message || "Failed to update user profile info!");
        }
  
        return data.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  


export const updateUserMembershipInfo = createAsyncThunk(
    "userProfileDetails/updateUserMembershipInfo",
    async ({ userEmail, userMembershipObj, axiosSecure }, { rejectWithValue }) => {
      try {
        const { data } = await axiosSecure.patch("/users/update_user_membership_info", {
          userEmail,
          userMembershipObj,
        });
  
        if (data.status !== 200) {
          throw new Error(data.message || "Failed to update user membership info!");
        }
  
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

        // To get full user information
        builder.addCase(getUserProfileDetails.pending, (state) => {
            state.userProfileDetails = {};
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
            state.userProfileDetails = {};
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        });


        // To update user personal information
        builder.addCase(updateUserProfileInfo.pending, (state) => {
            state.userProfileDetails = {};
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(updateUserProfileInfo.fulfilled, (state, action) => {
            state.userProfileDetails = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(updateUserProfileInfo.rejected, (state, action) => {
            state.userProfileDetails = {};
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        });


        // To update user membership information
        builder.addCase(updateUserMembershipInfo.pending, (state) => {
            state.userProfileDetails = {};
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(updateUserMembershipInfo.fulfilled, (state, action) => {
            state.userProfileDetails = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(updateUserMembershipInfo.rejected, (state, action) => {
            state.userProfileDetails = {};
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        });
    },
});


export default userProfileDetailsSlice.reducer;