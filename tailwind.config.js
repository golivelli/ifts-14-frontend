/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                // Colores oficiales del IFTS N°14
                primary: {
                    DEFAULT: '#0E4576', // Azul principal
                    50: '#e8f1f8',
                    100: '#d1e3f1',
                    200: '#a3c7e3',
                    300: '#75abd5',
                    400: '#478fc7',
                    500: '#1973b9',
                    600: '#0E4576', // Principal
                    700: '#0b3760',
                    800: '#08294a',
                    900: '#051b34',
                },
                accent: {
                    DEFAULT: '#EB840F', // Naranja principal
                    50: '#fef5e7',
                    100: '#fdebd0',
                    200: '#fbd7a1',
                    300: '#f9c372',
                    400: '#f7af43',
                    500: '#EB840F', // Principal
                    600: '#d6770d',
                    700: '#a85d0a',
                    800: '#7a4308',
                    900: '#4c2905',
                },
                neutral: {
                    DEFAULT: '#f5f5f0',
                    50: '#fafaf8',
                    100: '#f5f5f0',
                    200: '#e8e8e0',
                    300: '#d4d4c8',
                    400: '#b8b8a8',
                    500: '#9a9a88',
                    600: '#7a7a68',
                    700: '#5a5a48',
                    800: '#3a3a28',
                    900: '#1a1a10',
                },
            },
            fontFamily: {
                sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
                heading: ['DM Sans', 'Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
