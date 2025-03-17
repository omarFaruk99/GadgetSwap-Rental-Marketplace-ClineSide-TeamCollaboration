import React, {useEffect, useState} from 'react';

const UseTheme = () => {

    const [darkMode, setDarkMode] = useState(false);


    // Theme detection and localStorage functionality
    useEffect(() => {

        // Check if theme is stored in localStorage
        const storedTheme = localStorage.getItem("gadgetswap-theme");

        if (storedTheme) {
            // If found, use the stored theme
            const themeObject = JSON.parse(storedTheme);
            setDarkMode(themeObject.isDark);
        }
        else {
            // If not found, check system preference
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setDarkMode(prefersDark);

            // Save to localStorage
            localStorage.setItem("gadgetswap-theme", JSON.stringify({isDark: prefersDark, source: "system"}));
        }
    }, []);


    // Toggle Dark Mode
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("gadgetswap-theme", JSON.stringify({isDark: newMode, source: "user-selected"}));
            return newMode;
        });
    };


    return {darkMode, toggleDarkMode};
};

export default UseTheme;
