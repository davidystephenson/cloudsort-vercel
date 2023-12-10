// These styles apply to every route in the application
import '@/styles/globals.css'
import '@radix-ui/themes/styles.css'
import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import AuthStatus from 'views/auth-status'
import { Suspense } from 'react'
import ThemeView from 'views/theme-view'

const title = 'CloudSort'
const description =
  'Sort your lists.'

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
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeView>
          <Toaster />
          <Suspense fallback='Loading...'>
            {/* @ts-expect-error Async Server Component */}
            <AuthStatus />
          </Suspense>
          {children}
        </ThemeView>
      </body>
    </html>
  )
}
