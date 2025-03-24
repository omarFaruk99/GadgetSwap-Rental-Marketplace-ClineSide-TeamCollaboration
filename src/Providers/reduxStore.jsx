import {configureStore} from "@reduxjs/toolkit";
import darkLightThemeReducer from "../Features/darkLightTheme/darkLightThemeSlice";
import allGadgetsForGadgetsPageReducer from "../Features/allGadgetsForGadgetsPage/allGadgetsForGadgetsPageSlice";


const reduxStore = configureStore({
    reducer: {
        darkMode: darkLightThemeReducer,
        allGadgetsForGadgetsPage: allGadgetsForGadgetsPageReducer
    },
});

export default reduxStore;
