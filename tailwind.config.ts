module.exports = {
  darkMode: 'media', // Enable dark mode based on OS preference
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
      extend: {
          colors: {
              brandBlue: '#0070f3', // Custom color for your app
          },
      },
  },
  plugins: [],
};
