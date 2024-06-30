/** @type {import('tailwindcss').Config} */
import { colors } from "./src/config/appConfig";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: colors,
    },
  },
  plugins: [],
};
