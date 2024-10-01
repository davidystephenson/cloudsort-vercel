import ThemeLinkableView from '@/theme/theme-linkable-view'
import { useMovie } from './movie-context'
import { LinkProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function MovieLinkView (props: {
  children: ReactNode
  linkProps?: LinkProps
}): JSX.Element {
  const movie = useMovie()
  return (
    <ThemeLinkableView
      href={movie.imdbUrl}
      isExternal
      {...props.linkProps}
    >
      {props.children}
    </ThemeLinkableView>
  )
}
