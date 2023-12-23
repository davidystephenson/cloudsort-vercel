// These styles apply to every route in the application
import '@/styles/globals.css'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import ThemeView from '@/lib/theme/theme-view'
import serverAuth from '@/lib/auth/server-auth'
import clsx from 'clsx'

const title = 'CloudSort'
const description = 'Sort your lists.'

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description
  },
  metadataBase: new URL('https://clousort.io'),
  themeColor: '#FFF'
}

export default async function RootLayout ({
  children
}: {
  children: React.ReactNode
}): Promise<JSX.Element> {
  const authSession = await serverAuth()
  const themeCookie = cookies().get('theme')
  const newThemeCookie = cookies().get('newTheme')
  const newTheme = newThemeCookie?.value != null && newThemeCookie.value !== 'none'
    ? newThemeCookie.value
    : undefined
  const shade = newTheme ?? authSession?.user.theme ?? themeCookie?.value
  const htmlClass = clsx(shade, 'text-foreground', 'bg-background')
  return (
    <html
      lang='en'
      className={htmlClass}
      suppressHydrationWarning
    >
      <body>
        <Suspense fallback='Loading...'>
          <ThemeView shade={shade}>
            {children}
          </ThemeView>
        </Suspense>
      </body>
    </html>
  )
}
