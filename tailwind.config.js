/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        itim: ['Itim', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Enhanced color palette
        'eco-green': '#228B22',
        'eco-green-light': '#4caf50',
        'eco-green-dark': '#1a8d2d',
        'eco-black': '#0f0f0f',
        'eco-gray': '#f8f9fa',
      },
      screens: {
        xs: '480px',
        // Default Tailwind breakpoints
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      spacing: {
        18: '4.5rem',
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 4px 6px rgba(0, 0, 0, 0.05)',
        medium: '0 6px 12px rgba(0, 0, 0, 0.08)',
        strong: '0 10px 25px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};
