// These styles apply to every route in the application
import '@/styles/globals.css'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import getDaisyTheme from '@/lib/get-daisy-theme'
import LayoutView from '@/components/layout'
import auth from '@/lib/auth'
import { clearNewTheme } from './actions/clearNewTheme'

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
  children,
  params
}: {
  children: React.ReactNode
  params: Record<string, string>
}): Promise<JSX.Element> {
  const authSession = await auth()
  // console.log('session', authSession)
  const themeCookie = cookies().get('theme')
  // console.log('themeCookie', themeCookie)
  const newThemeCookie = cookies().get('newTheme')
  // console.log('newThemeCookie', newThemeCookie)
  const newTheme = newThemeCookie?.value != null && newThemeCookie.value !== 'none'
    ? newThemeCookie.value
    : undefined
  // void clearNewTheme()
  const shade = newTheme ?? authSession?.user.theme ?? themeCookie?.value
  console.log('shade', shade)
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
