// These styles apply to every route in the application
import '@/styles/globals.css'
import { Metadata } from 'next'
import { Suspense } from 'react'
import ThemeView from '@/lib/theme/theme-view'
import serverAuth from '@/lib/auth/server-auth'
import LayoutView from '@/lib/layout/layout-view'
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
  metadataBase: new URL('https://cloudsort.io'),
  themeColor: '#FFF'
}

export default async function RootLayout (props: {
  children: React.ReactNode
}): Promise<JSX.Element> {
  const authSession = await serverAuth()
  console.log('authSession', authSession)
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Suspense fallback='Loading...'>
          <AuthView session={authSession}>
            <ThemeView
              shade={authSession?.user.theme}
            >
              <LayoutView>
                {props.children}
              </LayoutView>
            </ThemeView>
          </AuthView>
        </Suspense>
      </body>
    </html>
  )
}
