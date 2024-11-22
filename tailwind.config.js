/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-wallpaper': "url('/loginWallpaper.jpg')",
        'home-wallpaper': "url('/homeWallpaper.jpg')" ,
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwindcss-animated'),
  ],
}

