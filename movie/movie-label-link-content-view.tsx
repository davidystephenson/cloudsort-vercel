import { LinkProps } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import MovieLabelView from './movie-label-view'

export default function MovieLabelLinkContentView (props: {
  linkProps?: LinkProps
}): JSX.Element {
  return (
    <MovieLabelView>
      &thinsp;
      <ExternalLinkIcon mx='2px' />
    </MovieLabelView>
  )
}
