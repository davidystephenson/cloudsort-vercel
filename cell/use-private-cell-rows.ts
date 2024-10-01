import { Cells, CellsKey, Row } from '@/cell/cell-types'
import privateListContext from '@/list/private-list-context'
import { marion } from '@/mergechoice/marion/marion'
import { Actors } from '@/mergechoice/marion/marionTypes'
import { EpisodePart, Item } from '@/mergechoice/mergeChoiceTypes'
import { CalculatedMovie } from '@/movie/movie-types'
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

export default function usePrivateCellRows (): Array<Row<CellsKey>> {
  const list = privateListContext.useContext()
  const movies = moviesContext.useContext()
  const sifted: Array<Row<keyof Cells>> = []
  if (list.historySifter.sifted.length !== 0) {
    const historyRow: Row<'history'> = {
      cells: { type: 'history' },
      id: 'history',
      type: 'history'
    }
    sifted.push(historyRow)
  }
  const episodeRows = list.historySifter.sifted.flatMap((episode, index) => {
    const first = index === 0
    if (!list.historyFlag.raised && !first) {
      return []
    }
    const rows: Array<Row<keyof Cells>> = []
    const id = `episode-${episode.mergeChoiceId}`
    const episodeRow: Row<'episode'> = {
      cells: { episode, type: 'episode' },
      id,
      type: 'episode'
    }
    rows.push(episodeRow)
    function produceMovie (props: {
      movie: CalculatedMovie
    }): Row<'episodeMovie'> {
      const id = `episode-${episode.mergeChoiceId}-movie-${props.movie.id}`
      const row: Row<'episodeMovie'> = {
        cells: {
          episode,
          movie: props.movie,
          type: 'episodeMovie'
        },
        id,
        type: 'episodeMovie'
      }
      return row
    }
    const closed = list.openedEpisodes.every(opened => opened !== episode.mergeChoiceId)
    if (closed) {
      return rows
    }
    const episodeRows = marionEpisodeCellRows({
      actors: {
        archive: () => [],
        choice: props => {
          const aRow = produceMovie({ movie: props.input.aItem })
          const bRow = produceMovie({ movie: props.input.bItem })
          return [aRow, bRow]
        },
        import: props => {
          const rows = props.input.items.map(item => {
            const row = produceMovie({ movie: item })
            return row
          })
          return rows
        },
        random: props => {
          const first = produceMovie({ movie: props.input.first })
          const second = produceMovie({ movie: props.input.second })
          const rows = [first, second]
          return rows
        },
        remove: () => [],
        reset: () => [],
        unarchive: () => []
      },
      complement: {},
      part: episode
    })
    rows.push(...episodeRows)
    return rows
  })
  sifted.push(...episodeRows)
  if (list.archiveSifter.sifted.length !== 0) {
    const archiveRow: Row<'archive'> = {
      cells: { type: 'archive' },
      id: 'archive',
      type: 'archive'
    }
    sifted.push(archiveRow)
  }
  if (list.archiveFlag.raised) {
    const archiveMovieRows = list.archiveSifter.sifted.map(movie => {
      const archiveMovieRow: Row<'archiveMovie'> = {
        cells: { movie, type: 'archiveMovie' },
        id: `archive-movie-${movie.id}`,
        type: 'archiveMovie'
      }
      return archiveMovieRow
    })
    sifted.push(...archiveMovieRows)
  }
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
