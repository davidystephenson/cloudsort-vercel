// These styles apply to every route in the application
import '@/styles/globals.css'
import { Metadata } from 'next'
import { Suspense } from 'react'
import ThemeView from '@/theme/theme-view'
import serverAuth from '@/auth/server-auth'
import LayoutView from '@/layout/layout-view'
import AuthView from '@/auth/auth-view'
import { cookies } from 'next/headers'
import prisma from '@/prisma/prisma'

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
  themeColor: '#FFF',
  icons: {
    icon: '/favicon.ico'
  }
}

function isShady (value: unknown): asserts value is 'light' | 'dark' | undefined {
  if (value != null && value !== 'light' && value !== 'dark') {
    throw new Error('Invalid shade')
  }
}

export default async function RootLayout (props: {
  children: React.ReactNode
}): Promise<JSX.Element> {
  const authSession = await serverAuth()
  const shadeCookie = cookies().get('shade')
  isShady(shadeCookie?.value)
  const newShadeCookie = cookies().get('newShade')
  const newShade = newShadeCookie?.value != null && newShadeCookie.value !== 'none'
    ? newShadeCookie.value
    : undefined
  isShady(newShade)
  const shade = newShade ?? authSession?.user.shade ?? shadeCookie?.value
  const itemHides = authSession?.user == null
    ? undefined
    : await prisma.itemHide.findMany({
      where: {
        userId: authSession.user.id
      }
    })
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Suspense fallback='Loading...'>
          <AuthView
            session={authSession}
            itemHides={itemHides}
          >
            <ThemeView shade={shade}>
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
