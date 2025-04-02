import { configureStore } from "@reduxjs/toolkit";
import darkLightThemeReducer from "../Features/darkLightTheme/darkLightThemeSlice"

const reduxStore = configureStore({
    reducer: {
        darkMode: darkLightThemeReducer,
    },
});

export default reduxStore;
