// These styles apply to every route in the application
import '@/styles/globals.css'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import getDaisyTheme from '@/lib/getDaisyTheme'
import LayoutView from '@/components/layout'

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
  const themeCookie = cookies().get('theme')
  const daisyTheme = getDaisyTheme({ shade: themeCookie?.value })

  return (
    <html
      lang='en'
      className={themeCookie?.value}
      data-theme={daisyTheme}
      suppressHydrationWarning
    >
      <body>
        <Suspense fallback='Loading...'>
          <LayoutView themeCookie={themeCookie?.value}>
            {children}
          </LayoutView>
        </Suspense>
      </body>
    </html>
  )
}
