import { State } from '@/mergechoice/mergeChoiceTypes'
import rewindState from '@/mergechoice/rewindState'
import { ListMovie } from '@/movie/movie-types'

addEventListener('message', (event: MessageEvent<{
  episodeId: string
  state: State<ListMovie>
}>) => {
  const newState = rewindState({
    episodeId: event.data.episodeId,
    state: event.data.state
  })
  postMessage(newState)
})
