import privateListContext from '@/list/private-list-context'
import { CalculatedMovie } from './movie-types'
import contextCreator from 'context-creator'
import postItemHide from '@/hide/post-item-hide'
import { useAuthContext } from '@/auth/auth-context'

const movieContext = contextCreator({
  name: 'movie',
  useValue: (props: {
    calculated: CalculatedMovie
  }) => {
    const auth = useAuthContext()
    const privateList = privateListContext.useOptionalContext()
    function archive (): void {
      if (privateList == null) {
        throw new Error('There is no privacy')
      }
      privateList.archive({ movieId: props.calculated.id })
    }
    async function hide (): Promise<void> {
      await postItemHide({
        itemId: props.calculated.id,
        label: 'Hide movie'
      })
      auth.hideItem({ itemId: props.calculated.id })
    }
    function remove (): void {
      if (privateList == null) {
        throw new Error('There is no privacy')
      }
      privateList.removeMovie({ movieId: props.calculated.id })
    }
    function reset (): void {
      if (privateList == null) {
        throw new Error('There is no privacy')
      }
      privateList.reset({ movieId: props.calculated.id })
    }
    function unarchive (): void {
      if (privateList == null) {
        throw new Error('There is no privacy')
      }
      privateList.unarchive({ movieId: props.calculated.id })
    }
    const imdbUrl = `https://www.imdb.com/title/${props.calculated.imdbId}`
    function open (): void {
      window.open(imdbUrl, '_blank')
    }
    const value = {
      archive,
      calculated: props.calculated,
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
