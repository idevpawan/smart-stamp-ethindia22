/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        text: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
