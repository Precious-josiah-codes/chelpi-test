module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#4FC08D',
        secondary: '#273849',
      }
    },
    fontFamily: {
      'Poppins': ['Poppins'],
      'Goblin': ['Goblin One'],
      'Fira': ['Fira Sans'],
  },
  },
  variants: {
    extend: {
      transitionProperty: ['responsive', 'motion-safe', 'motion-reduce']
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
