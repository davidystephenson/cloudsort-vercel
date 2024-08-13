import { ReactNode } from 'react'

export default function LineSpanView (props: {
  children: ReactNode
}): JSX.Element {
  const spanStyle = {
    whiteSpace: 'nowrap'
  }
  return (
    <span style={spanStyle}>
      {props.children}
    </span>
  )
}
