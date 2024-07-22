import ThemeTdView from '@/theme/theme-td-view'
import { LinkProps, Text, TextProps } from '@chakra-ui/react'
import { useMovie } from './movie-context'
import MovieLabelCellView from './movie-label-cell-view'

export default function MovieLabelCellsView (props: {
  linkProps?: LinkProps
  seedProps?: TextProps
}): JSX.Element {
  const movie = useMovie()
  const views = (
    <>
      <MovieLabelCellView linkProps={props.linkProps} />
      <ThemeTdView>
        <Text {...props.seedProps}>{movie.calculated.seed}</Text>
      </ThemeTdView>
    </>
  )
  return views
}
