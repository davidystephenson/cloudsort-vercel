import ThemeLinkableView from '@/theme/theme-linkable-view'
import ThemeTdView from '@/theme/theme-td-view'
import { HStack, LinkProps } from '@chakra-ui/react'
import { useMovie } from './movie-context'
import MovieLabelView from './movie-label-view'
import { ReactNode } from 'react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

export default function MovieLabelCellView (props: {
  children?: ReactNode
  linkProps?: LinkProps
}): JSX.Element {
  const movie = useMovie()
  return (
    <ThemeTdView w='100%'>
      <HStack>
        {props.children}
        <ThemeLinkableView
          href={movie.imdbUrl}
          isExternal
          {...props.linkProps}
        >
          <MovieLabelView>
            &thinsp;
            <ExternalLinkIcon mx='2px' />
          </MovieLabelView>
        </ThemeLinkableView>
      </HStack>
    </ThemeTdView>
  )
}
