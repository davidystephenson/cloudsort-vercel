import { HeadingProvider } from './heading-context'
import HeadingConsumer from './heading-consumer'
import { ReactNode } from 'react'
import { TableProps } from '@chakra-ui/react'

export default function HeadingView (props: {
  children?: ReactNode
  content?: JSX.Element
} & Omit<TableProps, 'content'>): JSX.Element {
  const { content, children, ...restProps } = props
  return (
    <HeadingProvider content={props.content}>
      <HeadingConsumer {...restProps}>
        {props.children}
      </HeadingConsumer>
    </HeadingProvider>
  )
}
