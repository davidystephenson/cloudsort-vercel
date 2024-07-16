import { Episode } from '@/mergeChoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import contextCreator from 'context-creator'

const historyContext = contextCreator({
  name: 'episode',
  useValue: (props: {
    episode: Episode<ListMovie>
  }) => {
    const value = {
      episode: props.episode
    }
    return value
  }
})
export default historyContext
