// These styles apply to every route in the application
import '@/styles/globals.css'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import getDaisyTheme from '@/lib/get-daisy-theme'
import LayoutView from '@/components/layout'
import auth from '@/lib/auth'

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
  const authSession = await auth()
  const themeCookie = cookies().get('theme')
  const newThemeCookie = cookies().get('newTheme')
  const newTheme = newThemeCookie?.value != null && newThemeCookie.value !== 'none'
    ? newThemeCookie.value
    : undefined
  const shade = newTheme ?? authSession?.user.theme ?? themeCookie?.value
  const daisyTheme = getDaisyTheme({ shade })

  return (
    <html
      lang='en'
      className={shade}
      data-theme={daisyTheme}
      suppressHydrationWarning
    >
      <body>
        <Suspense fallback='Loading...'>
          <LayoutView shade={shade}>
            {children}
          </LayoutView>
        </Suspense>
      </body>
    </html>
  )
}
