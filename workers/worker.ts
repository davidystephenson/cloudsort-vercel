import deduceState from '@/mergechoice/deduceState'

addEventListener('message', (event) => {
  const state = deduceState({
    history: event.data,
    seed: event.data.seed
  })
  const json = JSON.stringify(state)
  postMessage(json)
})
