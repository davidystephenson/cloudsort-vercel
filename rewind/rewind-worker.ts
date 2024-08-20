import { State } from '@/mergechoice/mergeChoiceTypes'
import rewindState from '@/mergechoice/rewindState'
import { ListMovie } from '@/movie/movie-types'

addEventListener('message', (event: MessageEvent<{
  episodeId: number
  state: State<ListMovie>
}>) => {
  function handleEpisode (props: {
    index: number
  }): void {
    const message = {
      type: 'episode',
      index: props.index
    }
    postMessage(message)
  }
  const newState = rewindState({
    onEpisode: handleEpisode,
    episodeId: event.data.episodeId,
    state: event.data.state
  })
  void newState
  const message = {
    type: 'state',
    state: newState
  }
  postMessage(message)
})
