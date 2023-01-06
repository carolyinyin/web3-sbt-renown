module.exports = {
  darkMode: 'class', //宣告 class="dark" or media(隨裝置變化)
  content: [
    "./src/**/*.{html,ts,scss,css}",
  ],
  theme: {
    extend: {
      container: {
        // center: true,
        // padding: {
        //   DEFAULT: '2rem',
        //   sm: '4rem',
        //   lg: '4rem',
        //   xl: '5rem',
        //   '2xl': '6rem',
        // },
      },
      colors: {
        "customer": "#38BDF8"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
