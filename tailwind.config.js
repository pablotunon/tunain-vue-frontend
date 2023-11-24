/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [],
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}
