import listContext from '@/list/list-context'
import { Episode } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import contextCreator from 'context-creator'

const episodeContext = contextCreator({
  name: 'episode',
  useValue: (props: {
    episode: Episode<ListMovie>
  }) => {
    const list = listContext.useContext()
    function rewind (): void {
      list.rewind({ episodeMergechoiceId: props.episode.mergeChoiceId })
    }
    const value = {
      element: props.episode,
      rewind
    }
    return value
  }
})
export default episodeContext
