import { DeduceEpisode } from '@/deduce/deduce-types'
import { State } from '@/mergechoice/mergeChoiceTypes'
import rewindState from '@/mergechoice/rewindState'
import { ListMovie } from '@/movie/movie-types'
import { RewindState } from '@/shade/rewind-types'

addEventListener('message', (event: MessageEvent<{
  episodeId: number
  lastMergechoiceId: string
  listId: string
  state: State<ListMovie>
}>) => {
  function handleEpisode (props: {
    index: number
  }): void {
    const message: DeduceEpisode = {
      type: 'episode',
      index: props.index
    }
    postMessage(message)
  }
  const newState = rewindState({
    episodeId: event.data.episodeId,
    history: event.data.state.history,
    onEpisode: handleEpisode,
    seed: event.data.state.seed
  })
  void newState
  const message: RewindState = {
    episodeId: event.data.episodeId,
    lastMergechoiceId: Number(event.data.lastMergechoiceId),
    type: 'state',
    state: newState
  }
  postMessage(message)
})
