import { LinkProps } from '@chakra-ui/react'
import MovieLinkView from './movie-link-view'
import MovieLabelLinkContentView from './movie-label-link-content-view'

export default function MovieLabelLinkView (props: {
  linkProps?: LinkProps
}): JSX.Element {
  return (
    <MovieLinkView linkProps={props.linkProps}>
      <MovieLabelLinkContentView />
    </MovieLinkView>
  )
}
