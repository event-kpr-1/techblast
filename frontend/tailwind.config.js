// import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        // 'bgimg-1': "url('/images/techblast2024.png')",
        // 'bg-1' : "yellow-400"
        
        
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

