import ThemeTdView from '@/theme/theme-td-view'
import { LinkProps, Text, TextProps } from '@chakra-ui/react'
import { useMovie } from './movie-context'
import MovieLabelCellView from './movie-label-cell-view'
import { ReactNode } from 'react'

export default function MovieLabelCellsView (props: {
  children?: ReactNode
  linkProps?: LinkProps
  seedProps?: TextProps
}): JSX.Element {
  const movie = useMovie()
  const views = (
    <>
      <MovieLabelCellView linkProps={props.linkProps}>
        {props.children}
      </MovieLabelCellView>
      <ThemeTdView>
        <Text {...props.seedProps}>{movie.item.seed}</Text>
      </ThemeTdView>
    </>
  )
  return views
}
