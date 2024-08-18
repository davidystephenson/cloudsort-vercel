import { State } from '@/mergechoice/mergeChoiceTypes'
import rewindState from '@/mergechoice/rewindState'
import { ListMovie } from '@/movie/movie-types'

addEventListener('message', (event: MessageEvent<{
  episodeId: number
  state: State<ListMovie>
}>) => {
  console.log('rewind-worker event.data', event.data)
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
  console.log('rewind-worker state', newState)
  const message = {
    type: 'state',
    state: newState
  }
  postMessage(message)
})
