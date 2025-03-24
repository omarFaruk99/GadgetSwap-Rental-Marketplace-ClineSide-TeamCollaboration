import {configureStore} from "@reduxjs/toolkit";
import darkLightThemeReducer from "../Features/darkLightTheme/darkLightThemeSlice";
import allGadgetsForGadgetsPageReducer from "../Features/allGadgetsForGadgetsPage/allGadgetsForGadgetsPageSlice";
import gadgetDetailsByIdReducer from "../Features/gadgetDetailsById/gadgetDetailsByIdSlice";


const reduxStore = configureStore({
    reducer: {
        darkMode: darkLightThemeReducer,
        allGadgetsForGadgetsPage: allGadgetsForGadgetsPageReducer,
        gadgetDetailsById: gadgetDetailsByIdReducer,
    },
});

export default reduxStore;
