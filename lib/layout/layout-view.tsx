import { ReactNode } from 'react'
import NavbarView from './navbar-view'

export default async function LayoutView (props: {
  children: ReactNode
}): Promise<JSX.Element | null> {
  return (
    <div className='container mx-auto' style={{ fontFamily: 'sans-serif' }}>
      {/* @ts-expect-error Async Server Component */}
      <NavbarView />
      {props.children}
    </div>
  )
}
