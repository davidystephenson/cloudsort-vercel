import { DeduceEpisode } from '@/deduce/deduce-types'
import rewindState from '@/mergechoice/rewindState'
import { RewindInput, RewindState } from './rewindTypes'

addEventListener('message', (event: MessageEvent<RewindInput>) => {
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
