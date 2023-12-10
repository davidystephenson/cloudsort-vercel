// These styles apply to every route in the application
import '@/styles/globals.css'
import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import AuthStatus from 'views/auth-status'
import { Suspense } from 'react'

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
    <html lang='en'>
      <body>
        <Toaster />
        <Suspense fallback='Loading...'>
          {/* @ts-expect-error Async Server Component */}
          <AuthStatus />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
