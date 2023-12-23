// These styles apply to every route in the application
import '@/styles/globals.css'
import { Metadata } from 'next'
import { Suspense } from 'react'
import ThemeView from '@/lib/theme/theme-view'
import serverAuth from '@/lib/auth/server-auth'
import clsx from 'clsx'
import LayoutView from '@/lib/layout/layout-view'
import getShade from '@/lib/theme/get-shade'

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
  const shade = getShade({ sessionTheme: authSession?.user.theme })
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
            {/* @ts-expect-error Async Server Component */}
            <LayoutView>
              {children}
            </LayoutView>
          </ThemeView>
        </Suspense>
      </body>
    </html>
  )
}
