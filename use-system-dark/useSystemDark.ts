import { useMediaQuery } from 'usehooks-ts'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'

export default function useSystemDark (): boolean {
  const systemColor = useMediaQuery(COLOR_SCHEME_QUERY)
  return systemColor
}
