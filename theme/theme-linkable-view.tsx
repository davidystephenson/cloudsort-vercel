import { LinkProps } from '@chakra-ui/next-js'
import ThemeLinkView from './theme-link-view'
import { ReactNode } from 'react'

export default function ThemeLinkableView (props: Omit<LinkProps, 'href'> & {
  children: ReactNode
  href?: string | null
}): JSX.Element {
  if (props.href == null) {
    return (
      <>{props.children}</>
    )
  }
  return (
    <ThemeLinkView {...props} href={props.href}>
      {props.children}
    </ThemeLinkView>
  )
}
