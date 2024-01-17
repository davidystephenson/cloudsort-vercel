import { ReactNode } from 'react'

export default function TableWrapperView (props: {
  children: ReactNode
}): JSX.Element {
  return (
    <div>
      {props.children}
    </div>
  )
}
