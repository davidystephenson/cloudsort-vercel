import { CellsKey, Row } from '@/cell/cell-types'
import listContext from '@/list/list-context'
import { marion } from '@/mergechoice/marion/marion'
import { Actors } from '@/mergechoice/marion/marionTypes'
import { EpisodePart, Item, ItemId } from '@/mergechoice/mergeChoiceTypes'

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
  const list = listContext.useContext()
  const historyRow: Row<'history'> = {
    cells: { type: 'history' },
    id: 'history',
    type: 'history'
  }
  console.log('list.siftedEpisodes', list.siftedEpisodes)
  const episodeRows = list.siftedEpisodes.flatMap(episode => {
    const id = `episode-${episode.mergeChoiceId}`
    const episodeRow: Row<'episode'> = {
      cells: { episodeId: episode.mergeChoiceId, type: 'episode' },
      id,
      type: 'episode'
    }
    function produceMovie (props: {
      movieId: ItemId
    }): Row<'episodeMovie'> {
      if (typeof props.movieId !== 'number') {
        throw new Error('movieId must be a number')
      }
      const id = `episode-${episode.mergeChoiceId}-movie-${props.movieId}`
      const row: Row<'episodeMovie'> = {
        cells: {
          episodeId: episode.mergeChoiceId,
          movieId: props.movieId,
          type: 'episodeMovie'
        },
        id,
        type: 'episodeMovie'
      }
      return row
    }
    const episodeRows = marionEpisodeRows({
      actors: {
        archive: props => {
          const row = produceMovie({ movieId: props.input.item.id })
          return [row]
        },
        choice: props => {
          const aRow = produceMovie({ movieId: props.input.aItem.id })
          const bRow = produceMovie({ movieId: props.input.bItem.id })
          return [aRow, bRow]
        },
        import: props => {
          const rows = props.input.items.map(item => {
            const row = produceMovie({ movieId: item.id })
            return row
          })
          return rows
        },
        random: props => {
          const first = produceMovie({ movieId: props.input.first.id })
          const second = produceMovie({ movieId: props.input.second.id })
          const rows = [first, second]
          return rows
        },
        remove: props => {
          const row = produceMovie({ movieId: props.input.item.id })
          const rows = [row]
          return rows
        },
        reset: props => {
          const row = produceMovie({ movieId: props.input.item.id })
          const rows = [row]
          return rows
        },
        unarchive: props => {
          const row = produceMovie({ movieId: props.input.item.id })
          const rows = [row]
          return rows
        }
      },
      complement: {},
      part: episode
    })
    const rows = [episodeRow, ...episodeRows]
    return rows
  })
  const archiveRow: Row<'archive'> = {
    cells: { type: 'archive' },
    id: 'archive',
    type: 'archive'
  }
  const archiveMovieRows = list.siftedArchive.map(movie => {
    const archiveMovieRow: Row<'archiveMovie'> = {
      cells: { movieId: movie.id, type: 'archiveMovie' },
      id: `archive-movie-${movie.id}`,
      type: 'archiveMovie'
    }
    return archiveMovieRow
  })
  const listMoviesRow: Row<'listMovies'> = {
    cells: { type: 'listMovies' },
    id: 'listMovies',
    type: 'listMovies'
  }
  const listMovieRows = list.siftedMovies.map(movie => {
    const listMovieRow: Row<'listMovie'> = {
      cells: { movieId: movie.id, type: 'listMovie' },
      id: `list-movie-${movie.id}`,
      type: 'listMovie'
    }
    return listMovieRow
  })
  const sifted = [
    historyRow,
    ...episodeRows,
    archiveRow,
    ...archiveMovieRows,
    listMoviesRow,
    ...listMovieRows
  ]
  return sifted
}
