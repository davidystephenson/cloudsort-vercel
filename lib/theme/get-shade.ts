import { cookies } from 'next/headers'

export default function getShade (props: {
  sessionTheme?: string
}): string | undefined {
  const themeCookie = cookies().get('theme')
  const newThemeCookie = cookies().get('newTheme')
  const newTheme = newThemeCookie?.value != null && newThemeCookie.value !== 'none'
    ? newThemeCookie.value
    : undefined
  const shade = newTheme ?? props.sessionTheme ?? themeCookie?.value
  return shade
}
