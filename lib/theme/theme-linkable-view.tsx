import { LinkProps } from '@nextui-org/react'
import ThemeLinkView from './theme-link-view'
import { ReactNode } from 'react'
import isUrl from '../isUrl/is-url'

export default function ThemeLinkableView (props: {
  children: ReactNode
} & LinkProps): JSX.Element {
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
