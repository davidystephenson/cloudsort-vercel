'use client'

import { ReactNode } from 'react'

export default function ContainerView (props: {
  children: ReactNode
}): JSX.Element | null {
  return (
    <div className='container mx-auto'>
      {props.children}
    </div>
  )
}
