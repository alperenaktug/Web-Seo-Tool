/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#252525",
        "custom-grays": "#fbfbfb",
      },
      width: {
        "700px": "700px",
        "650px": "650px",
        "600px": "600px",
        "625px": "625px",
      },
      height: {
        "78px": "78px",
        "72px": "72px",
      },
      padding: {
        "20px": "20px",
        "25px": "25px",
      },
      fontWeight: {
        700: "700",
        600: "600",
        500: "500",
      },
      maxWidth: {
        "550px": "550px",
      },
      fontSize: {
        "20px": "20px",
      },
      lineHeight: {
        "35px": "35px",
      },

      spacing: {
        50: "50px",
        "35px": "35px",
        "50px": "50px",
        "80px": "80px",
        "150px": "150px",
        "170px": "170px",
        30: "30",
        "30px": "30px",
        "20px": "20px",
        "22px": "22px",
      },

      "custom-size": "20px",
    },
  },
  plugins: [],
};
