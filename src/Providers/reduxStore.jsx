import {configureStore} from "@reduxjs/toolkit";
import darkLightThemeReducer from "../Features/darkLightTheme/darkLightThemeSlice";
import allGadgetsForGadgetsPageReducer from "../Features/allGadgetsForGadgetsPage/allGadgetsForGadgetsPageSlice.js";
import gadgetDetailsByIdReducer from "../Features/gadgetDetailsById/gadgetDetailsByIdSlice";
import featuredGadgetsForHomePageReducer from "../Features/featuredGadgetsForHomePage/featuredGadgetsForHomePageSlice";
import userProfileDetailsReducer from "../Features/userProfileDetails/userProfileDetailsSlice.js";
import gadgetWishlistReducer from "../Features/gadgetWishlist/gadgetWishlistSlice.js";
// import gadgetWishlistReducer from "../Features/gadgetWishlist/gadgetWishlistSlice.js";



const reduxStore = configureStore({
    reducer: {
        darkMode: darkLightThemeReducer,
        allGadgetsForGadgetsPage: allGadgetsForGadgetsPageReducer,
        gadgetDetailsById: gadgetDetailsByIdReducer,
        featuredGadgetsForHomePage: featuredGadgetsForHomePageReducer,
        userProfileDetails: userProfileDetailsReducer,
        gadgetWishlist: gadgetWishlistReducer,
    },
});

export default reduxStore;
