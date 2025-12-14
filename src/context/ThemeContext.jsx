import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Initialize theme from localStorage or default to 'light'
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        const root = document.documentElement;

        // Persist to localStorage
        localStorage.setItem('theme', theme);

        // Remove all potential theme classes first
        root.classList.remove('dark');
        root.removeAttribute('data-theme');

        // Apply new theme settings
        if (theme === 'dark') {
            root.classList.add('dark');
        } else if (theme === 'neon') {
            root.classList.add('dark'); // Neon builds on top of dark mode for Tailwind util classes
            root.setAttribute('data-theme', 'neon');
        }
        // 'light' is default, so no class needed (unless we used a 'light' class, but usually it's the absence of dark)

    }, [theme]);

    const cycleTheme = () => {
        setTheme((prevTheme) => {
            if (prevTheme === 'light') return 'dark';
            if (prevTheme === 'dark') return 'neon';
            return 'light';
        });
    };

    const value = {
        theme,
        setTheme,
        cycleTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
