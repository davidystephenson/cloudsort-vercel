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
    async function _delete (): Promise<void> {
      list.deleteMovie({ movieId: props.calculated.mergeChoiceId })
    }
    const imdbUrl = `https://www.imdb.com/title/${props.calculated.imdbId}`
    function open (): void {
      window.open(imdbUrl, '_blank')
    }
    const value = {
      calculated: props.calculated,
      delete: _delete,
      imdbUrl,
      open
    }
    return value
  }
})
