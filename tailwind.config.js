import { nextui } from '@nextui-org/react'
const pinkTheme = {
  50: '#fce4ff',
  100: '#eab4ff',
  200: '#da82fd',
  300: '#ca51fb',
  400: '#ba20f8',
  500: '#a107df',
  600: '#7d03ae',
  700: '#5a017e',
  800: '#37004d',
  900: '#15001e',
  DEFAULT: '#ba20f8'
}

const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  plugins: [nextui({
    themes: {
      'pink-dark': {
        extend: 'dark',
        colors: {
          primary: pinkTheme
        }
      },
      'pink-light': {
        extend: 'light',
        colors: {
          primary: pinkTheme
        }
      }
    }
  })]
}

export default config
