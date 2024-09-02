/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        gray: "#808080",
      },
      spacing: {},
      fontFamily: {
        "roboto-serif": "'Roboto Serif'",
        inter: "Inter",
      },
      borderRadius: {
        "6xl": "25px",
      },
      fontSize: {
        // Custom font sizes added here
        "96xl": "96px",
        "80xl": "80px",
        "64xl": "64px",
        "48xl": "48px",
      },
    },
    
    fontSize: {
      mini: "15px",
      base: "16px",
      "5xl": "24px",
      lgi: "19px",
      "13xl": "32px",
      "7xl": "26px",
      "29xl": "48px",
      "10xl": "29px",
      "19xl": "38px",
      "46xl": "65px",
      "20xl": "39px",
      "33xl": "52px",
      "21xl": "40px",
      xl: "20px",
      "9xl": "28px",
      "3xl": "22px",
      inherit: "inherit",
    },
    screens: {
      lg: {
        max: "1200px",
      },
      mq1050: {
        raw: "screen and (max-width: 1050px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};