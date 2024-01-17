export interface ThemeContextValue {
  toggleTheme: (props: { debugLabel?: string }) => void
  darkened: boolean
  mounted: boolean
  shade?: string
}
