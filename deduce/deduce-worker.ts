import { ListHistory } from '@/history/history-types'
import deduceState from '@/mergechoice/deduceState'

addEventListener('message', (event: MessageEvent<{
  history: ListHistory
  seed: string
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
  const deduced = deduceState({
    history: event.data.history,
    onEpisode: handleEpisode,
    seed: event.data.seed
  })
  const message = {
    type: 'state',
    state: deduced
  }
  postMessage(message)
})
