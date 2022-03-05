const plugin = require('tailwindcss/plugin')

module.exports = {
  helpers: plugin(({ addUtilities }) => {
    addUtilities({
      '.transitable': {
        '@apply transition-all duration-300': {},
      },
      '.flex-center': {
        '@apply flex items-center justify-center': {},
      },
    })
  }),
}
