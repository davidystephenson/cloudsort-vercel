import { ReactNode } from 'react'
import NavbarLayoutView from './navbar-layout-view'

export default async function LayoutView (props: {
  children: ReactNode
}): Promise<JSX.Element | null> {
  return (
    <div
      className='flex flex-col w-full sm:w-[640px] mx-auto p-2 h-screen'
      style={{ fontFamily: 'sans-serif' }}
    >
      {/* @ts-expect-error Async Server Component */}
      <NavbarLayoutView />
      {props.children}
    </div>
  )
}
