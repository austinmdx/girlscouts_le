/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Cambria", "sans-serif"],
      },
      fontSize: {
        sm: ["14px", "16px"],
        base: ["16px", "18px"],
        lg: ["18px", "22px"],
        xl: ["20px", "24px"],
        "1xl": ["22px", "26px"],
        "2xl": ["28px", "34px"],
        "3xl": ["30px", "34px"],
        "4xl": ["34px", "41px"],
      },
      colors: ({ colors }) => ({
        green: {
          1: "#D5F267",
          2: "#005640",
          3: "#00B451",
          4: "#016f39",
        },
        orange: {
          1: "#FCB89D",
          2: "#FF830C",
        },
        purple: {
          1: "#CCB3FA",
          2: "#5c1f8b",
          3: '#1496D4'
        },
        blue: {
          1: "#004987",
        },
        brown: {
          1: "#763A16",
        },
        yellow: {
          1: '#F7BE00'
        }
      }),
    },
  },
  plugins: [],
};
