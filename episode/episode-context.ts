import { Episode } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import contextCreator from 'context-creator'

const episodeContext = contextCreator({
  name: 'episode',
  useValue: (props: {
    episode: Episode<ListMovie>
  }) => {
    const value = {
      doc: props.episode
    }
    return value
  }
})
export default episodeContext
