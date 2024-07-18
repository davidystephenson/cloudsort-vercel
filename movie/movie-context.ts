import { CalculatedMovie } from './movie-types'
import { useList } from '../list/list-context'
import contextCreator from 'context-creator'

export const {
  useContext: useMovie,
  Provider: MovieProvider
} = contextCreator({
  name: 'movie',
  useValue: (props: {
    calculated: CalculatedMovie
  }) => {
    const list = useList()
    async function archive (): Promise<void> {
      list.archive({ movieId: props.calculated.id })
    }
    async function remove (): Promise<void> {
      list.removeMovie({ movieId: props.calculated.id })
    }
    const imdbUrl = `https://www.imdb.com/title/${props.calculated.imdbId}`
    function open (): void {
      window.open(imdbUrl, '_blank')
    }
    const value = {
      archive,
      calculated: props.calculated,
      remove,
      imdbUrl,
      open
    }
    return value
  }
})
