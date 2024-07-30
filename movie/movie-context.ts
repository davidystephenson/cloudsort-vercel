import privateListContext from '@/list/private-list-context'
import { CalculatedMovie } from './movie-types'
import contextCreator from 'context-creator'
import postHideMovie from '@/hide/post-hide-movie'
import { useAuthContext } from '@/auth/auth-context'
import useAction from '@/action/use-action'
import postUnhideMovie from '@/hide/post-unhide-movie'

const movieContext = contextCreator({
  name: 'movie',
  useValue: (props: {
    item: CalculatedMovie
  }) => {
    const auth = useAuthContext()
    async function hideAction (): Promise<void> {
      await postHideMovie({
        itemId: props.item.id,
        label: 'Hide movie'
      })
      auth.hideItem({ itemId: props.item.id })
    }
    const hide = useAction({ action: hideAction })
    const hidden = auth.itemHides.some((itemHide) => itemHide.itemId === props.item.id)
    const unhide = useAction({
      action: async () => {
        await postUnhideMovie({
          itemId: props.item.id,
          label: 'Unhide movie'
        })
        auth.unhideItem({ itemId: props.item.id })
      }
    })
    const privateList = privateListContext.useOptionalContext()
    function archive (): void {
      if (privateList == null) {
        throw new Error('There is no privacy')
      }
      privateList.archive({ movieId: props.item.id })
    }
    function remove (): void {
      if (privateList == null) {
        throw new Error('There is no privacy')
      }
      privateList.removeMovie({ movieId: props.item.id })
    }
    function reset (): void {
      if (privateList == null) {
        throw new Error('There is no privacy')
      }
      privateList.reset({ movieId: props.item.id })
    }
    function unarchive (): void {
      if (privateList == null) {
        throw new Error('There is no privacy')
      }
      privateList.unarchive({ movieId: props.item.id })
    }
    const imdbUrl = `https://www.imdb.com/title/${props.item.imdbId}`
    function open (): void {
      window.open(imdbUrl, '_blank')
    }
    const value = {
      archive,
      hide,
      hidden,
      item: props.item,
      remove,
      reset,
      imdbUrl,
      open,
      unarchive,
      unhide
    }
    return value
  }
})
export default movieContext
export const {
  useContext: useMovie,
  Provider: MovieProvider
} = movieContext
