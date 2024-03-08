import { ReactNode } from 'react'

export default function CurtainView (props: {
  children?: ReactNode
  open?: boolean
  hider?: JSX.Element | false
}): JSX.Element {
  const hider = props.hider ?? <></>
  const element = props.open === true ? props.children : hider
  return <>{element}</>
}
