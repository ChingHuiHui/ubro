const {
  plugin: { helpers },
} = require('./tailwind')

module.exports = {
  // content: Add the paths to all of your template files in your tailwind.config.js file.
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
      },
    },
    extend: {
      colors: {
        primary: {
          light: '#96846c',
          DEFAULT: '#736552',
        },
      },
    },
  },
  plugins: [helpers],
}
