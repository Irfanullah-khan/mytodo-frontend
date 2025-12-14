/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            colors: {
                neon: {
                    bg: '#0a0a0a',
                    primary: '#ff00ff', // Magenta/Pink
                    secondary: '#00ffff', // Cyan
                    accent: '#7000ff', // Purple
                    text: '#ffffff',
                }
            },
            boxShadow: {
                'neon-pink': '0 0 10px #ff00ff, 0 0 20px #ff00ff',
                'neon-cyan': '0 0 10px #00ffff, 0 0 20px #00ffff',
            }
        },
    },
    plugins: [],
}
