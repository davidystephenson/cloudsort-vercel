import { ListHistory } from '@/history/history-types'
import deduceState from '@/mergechoice/deduceState'

addEventListener('message', (event: MessageEvent<{
  history: ListHistory
  seed: string
}>) => {
  const deduced = deduceState({
    history: event.data.history,
    seed: event.data.seed
  })
  postMessage(deduced)
})
