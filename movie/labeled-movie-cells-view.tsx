import { MovieProvider } from '@/movie/movie-context'
import MovieLabelCellsView from '@/movie/movie-label-cells-view'
import { ReactNode } from 'react'
import { CalculatedMovie } from './movie-types'
import { LinkProps, TextProps } from '@chakra-ui/react'

export default function LabeledMovieCellsView (props: {
  children: ReactNode
  linkProps?: LinkProps
  seedProps?: TextProps
  movie: CalculatedMovie
}): JSX.Element {
  const view = (
    <MovieProvider movie={props.movie}>
      <MovieLabelCellsView linkProps={props.linkProps} seedProps={props.seedProps} />
      {props.children}
    </MovieProvider>
  )
  return view
}
