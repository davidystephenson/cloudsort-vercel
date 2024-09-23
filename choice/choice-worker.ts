import { DeduceEpisode } from '@/deduce/deduce-types'
import { ListState } from '@/list/list-types'
import rewindState from '@/mergechoice/rewindState'
import { RewindState } from '@/rewind/rewindTypes'

addEventListener('message', (event: MessageEvent<{
  episodeId: number
  lastMergechoiceId: string
  listId: string
  state: ListState
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
