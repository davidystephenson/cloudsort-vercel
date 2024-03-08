import { HeadingProvider } from './heading-context'
import HeadingConsumer from './heading-consumer'
import { ReactNode } from 'react'

export default function HeadingView (props: {
  children?: ReactNode
  content?: JSX.Element
  label: string
}): JSX.Element {
  return (
    <HeadingProvider content={props.content} label={props.label}>
      <HeadingConsumer>
        {props.children}
      </HeadingConsumer>
    </HeadingProvider>
  )
}
