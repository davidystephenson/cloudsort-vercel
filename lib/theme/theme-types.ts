export interface ThemeContextValue {
  handleChangeTheme: () => void
  darkened: boolean
  mounted: boolean
  shade?: string
}
