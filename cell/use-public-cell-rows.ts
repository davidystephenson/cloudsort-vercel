import { Cells, CellsKey, Row } from '@/cell/cell-types'
import { marion } from '@/mergechoice/marion/marion'
import { Actors } from '@/mergechoice/marion/marionTypes'
import { EpisodePart, Item } from '@/mergechoice/mergeChoiceTypes'
import moviesContext from '@/movie/movies-context'

export function marionEpisodeCellRows<
  ListItem extends Item,
  Complement,
> (props: {
  actors: Actors<Complement, Array<Row<CellsKey>>, EpisodePart<ListItem>>
  complement: Complement
  part: EpisodePart<ListItem>
}): Array<Row<CellsKey>> {
  const marioned = marion(props)
  return marioned
}

export default function usePublicCellRows (): Array<Row<CellsKey>> {
  const movies = moviesContext.useContext()
  const sifted: Array<Row<keyof Cells>> = []
  const listMoviesRow: Row<'listMovies'> = {
    cells: { type: 'listMovies' },
    id: 'listMovies',
    type: 'listMovies'
  }
  sifted.push(listMoviesRow)
  if (movies.flag.raised) {
    const listMovieRows = movies.sifter.sifted.map(movie => {
      const listMovieRow: Row<'listMovie'> = {
        cells: { movie, type: 'listMovie' },
        id: `list-movie-${movie.id}`,
        type: 'listMovie'
      }
      return listMovieRow
    })
    sifted.push(...listMovieRows)
  }
  return sifted
}
