import deduceState from '@/mergechoice/deduceState'

console.log('worker.js loaded')
addEventListener('message', (event) => {
  console.log('event.data', event.data)
  const state = deduceState({
    history: event.data,
    seed: event.data.seed
  })
  const json = JSON.stringify(state)
  postMessage(json)
})
