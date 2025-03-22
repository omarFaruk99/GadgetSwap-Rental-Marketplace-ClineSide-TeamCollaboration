import { createSlice } from "@reduxjs/toolkit";


// Helper function to get initial theme from localStorage
const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("gadgetswap-theme");
    if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);
        return {
            isDark: parsedTheme.isDark, // Use saved isDark value
            source: parsedTheme.source, // Use saved source
        };
    }

    // Default to light theme if nothing in localStorage
    const defaultTheme = { isDark: false, source: "default" };
    localStorage.setItem("gadgetswap-theme", JSON.stringify(defaultTheme));
    return defaultTheme;
};


const darkLightThemeSlice = createSlice({
    name: "darkLightTheme",
    initialState: getInitialTheme(), // Call helper to set initial state
    reducers: {
        toggleDarkTheme: (state) => {
            state.isDark = !state.isDark; // Toggle theme
            state.source = "user-preference"; // Update source
            localStorage.setItem("gadgetswap-theme", JSON.stringify({ isDark: state.isDark, source: state.source })); // Save full object
        },
        setTheme: (state, action) => {
            state.isDark = action.payload; // Set theme explicitly (Not used in this project, but optionally developed.)
            state.source = "user-preference";
            localStorage.setItem("gadgetswap-theme", JSON.stringify({ isDark: state.isDark, source: state.source })); // Save full object
        },
    },
});


export const { toggleDarkTheme, setTheme } = darkLightThemeSlice.actions;
export default darkLightThemeSlice.reducer;
