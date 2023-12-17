import { UseThemeProps } from 'next-themes/dist/types'

export default function getDaisyTheme ({
  nextTheme,
  shade
}: {
  nextTheme?: UseThemeProps
  shade?: string
}): 'acid' | 'synthwave' | undefined {
  if (nextTheme?.resolvedTheme === 'system') {
    const systemString = nextTheme?.systemTheme as string
    if (systemString == null || systemString === 'system') {
      return getDaisyTheme({ shade })
    }
    return getDaisyTheme({ shade: systemString })
  }
  if (shade === 'light') {
    return 'acid'
  }
  if (shade === 'dark') {
    return 'synthwave'
  }
  return undefined
}
