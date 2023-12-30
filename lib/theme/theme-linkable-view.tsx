import { LinkProps } from '@nextui-org/react'
import ThemeLinkView from './theme-link-view'
import { ReactNode } from 'react'
import isUrl from '../isUrl/is-url'

export default function ThemeLinkableView (props: LinkProps & {
  children: ReactNode
  href?: string | null
}): JSX.Element {
  const linked = props.href != null && isUrl(props.href)
  if (linked) {
    return (
      <ThemeLinkView {...props}>
        {props.children}
      </ThemeLinkView>
    )
  }
  return (
    <>{props.children}</>
  )
}
