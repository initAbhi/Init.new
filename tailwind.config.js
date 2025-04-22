/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--poppins)", "poppins"], // Add custom font variable
        underdog: ["var(--underdog)", "underdog"],
        pacifico: ["var(--pacifico)", "pacifico"],
        lato: ["var(--lato)", "lato"],
      },
    },
  },
  plugins: [require('tailwind-scrollbar'),],
};
