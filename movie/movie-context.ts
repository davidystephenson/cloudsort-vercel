import privateListContext from '@/list/private-list-context'
import { CalculatedMovie } from './movie-types'
import contextCreator from 'context-creator'
import postItemHide from '@/hide/post-item-hide'
import { useAuthContext } from '@/auth/auth-context'

const movieContext = contextCreator({
  name: 'movie',
  useValue: (props: {
    movie: CalculatedMovie
  }) => {
    const auth = useAuthContext()
    const privateList = privateListContext.useOptionalContext()
    function archive (): void {
      if (privateList == null) {
        throw new Error('There is no privacy')
      }
      privateList.archive({ movieId: props.movie.id })
    }
    async function hide (): Promise<void> {
      await postItemHide({
        itemId: props.movie.id,
        label: 'Hide movie'
      })
      auth.hideItem({ itemId: props.movie.id })
    }
    function remove (): void {
      if (privateList == null) {
        throw new Error('There is no privacy')
      }
      privateList.removeMovie({ movieId: props.movie.id })
    }
    function reset (): void {
      if (privateList == null) {
        throw new Error('There is no privacy')
      }
      privateList.reset({ movieId: props.movie.id })
    }
    function unarchive (): void {
      if (privateList == null) {
        throw new Error('There is no privacy')
      }
      privateList.unarchive({ movieId: props.movie.id })
    }
    const imdbUrl = `https://www.imdb.com/title/${props.movie.imdbId}`
    function open (): void {
      window.open(imdbUrl, '_blank')
    }
    const value = {
      archive,
      item: props.movie,
      hide,
      remove,
      reset,
      imdbUrl,
      open,
      unarchive
    }
    return value
  }
})
export default movieContext
export const {
  useContext: useMovie,
  Provider: MovieProvider
} = movieContext
