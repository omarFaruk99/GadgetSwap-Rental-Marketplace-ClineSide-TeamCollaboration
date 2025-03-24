import {configureStore} from "@reduxjs/toolkit";
import darkLightThemeReducer from "../Features/darkLightTheme/darkLightThemeSlice";
import allGadgetsForGadgetsPageReducer from "../Features/allGadgetsForGadgetsPage/allGadgetsForGadgetsPageSlice.js";
import gadgetDetailsByIdReducer from "../Features/gadgetDetailsById/gadgetDetailsByIdSlice";
import featuredGadgetsForHomePageReducer from "../Features/featuredGadgetsForHomePage/featuredGadgetsForHomePageSlice";


const reduxStore = configureStore({
    reducer: {
        darkMode: darkLightThemeReducer,
        allGadgetsForGadgetsPage: allGadgetsForGadgetsPageReducer,
        gadgetDetailsById: gadgetDetailsByIdReducer,
        featuredGadgetsForHomePage: featuredGadgetsForHomePageReducer,
    },
});

export default reduxStore;
