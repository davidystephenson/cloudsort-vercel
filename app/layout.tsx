// These styles apply to every route in the application
import '@/styles/globals.css'
import { Metadata } from 'next'
import { Suspense } from 'react'
import ThemeView from '@/lib/theme/theme-view'
import serverAuth from '@/lib/auth/server-auth'
import clsx from 'clsx'
import LayoutView from '@/lib/layout/layout-view'
import getThemeShade from '@/lib/theme/get-theme-shade'
import AuthView from '@/lib/auth/auth-view'

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
  const shade = getThemeShade({ sessionTheme: authSession?.user.theme })
  const theme = shade === 'dark' ? 'pink-dark' : 'pink-light'
  const htmlClass = clsx(theme, 'text-foreground', 'bg-background')
  return (
    <html
      lang='en'
      className={htmlClass}
      suppressHydrationWarning
    >
      <body>
        <Suspense fallback='Loading...'>
          {/* @ts-expect-error Async Server Component */}
          <AuthView session={authSession}>
            <ThemeView shade={shade}>
              {/* @ts-expect-error Async Server Component */}
              <LayoutView>
                {children}
              </LayoutView>
            </ThemeView>
          </AuthView>
        </Suspense>
      </body>
    </html>
  )
}
