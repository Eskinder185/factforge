/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: "#00e5ff",
          violet: "#7c4dff"
        }
      }
    }
  },
  plugins: []
};
