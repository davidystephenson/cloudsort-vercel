import { Cells, CellsKey, Row } from '@/cell/cell-types'
import privateListContext from '@/list/private-list-context'
import { marion } from '@/mergechoice/marion/marion'
import { Actors } from '@/mergechoice/marion/marionTypes'
import { EpisodePart, Item } from '@/mergechoice/mergeChoiceTypes'
import { CalculatedMovie } from '@/movie/movie-types'

export function marionEpisodeRows<
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

export default function useSifted (): Array<Row<CellsKey>> {
  const list = privateListContext.useContext()
  const sifted: Array<Row<keyof Cells>> = []
  if (list.siftedEpisodes.length !== 0) {
    const historyRow: Row<'history'> = {
      cells: { type: 'history' },
      id: 'history',
      type: 'history'
    }
    sifted.push(historyRow)
  }
  const episodeRows = list.siftedEpisodes.flatMap((episode, index) => {
    const first = index === 0
    if (!list.historyFlag.flag && !first) {
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
    const episodeRows = marionEpisodeRows({
      actors: {
        archive: props => {
          const row = produceMovie({ movie: props.input.item })
          return [row]
        },
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
        remove: props => {
          const row = produceMovie({ movie: props.input.item })
          const rows = [row]
          return rows
        },
        reset: props => {
          const row = produceMovie({ movie: props.input.item })
          const rows = [row]
          return rows
        },
        unarchive: props => {
          const row = produceMovie({ movie: props.input.item })
          const rows = [row]
          return rows
        }
      },
      complement: {},
      part: episode
    })
    rows.push(...episodeRows)
    return rows
  })
  sifted.push(...episodeRows)
  if (list.siftedArchive.length !== 0) {
    const archiveRow: Row<'archive'> = {
      cells: { type: 'archive' },
      id: 'archive',
      type: 'archive'
    }
    sifted.push(archiveRow)
  }
  if (list.archiveFlag.flag) {
    const archiveMovieRows = list.siftedArchive.map(movie => {
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
  if (list.moviesFlag.flag) {
    const listMovieRows = list.siftedMovies.map(movie => {
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
