module.exports = {
  content: [
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js'
  ],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'acid',
      'synthwave' // first one will be the default theme
    ]
  }
}
