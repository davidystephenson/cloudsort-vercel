export interface ThemeContextValue {
  borderColor: string
  toggleTheme: (props: { debugLabel?: string }) => void
  darkened: boolean
  mounted: boolean
  shade?: string
}
