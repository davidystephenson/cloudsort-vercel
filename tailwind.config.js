module.exports = {
  content: [
    './views/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js'
  ],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'acid',
      'synthwave'
    ]
  }
}
