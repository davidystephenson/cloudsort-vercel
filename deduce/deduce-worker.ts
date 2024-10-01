import deduceState from '@/mergechoice/deduceState'
import addMarx from '@/marx-worker/addMarx'
import { DeduceInput, DeduceOutput } from './deduce-types'

addMarx<DeduceInput, DeduceOutput>((props) => {
  const deduced = deduceState({
    history: props.input.history,
    onEpisode: (onEpisodeProps) => {
      const message: DeduceOutput = {
        type: 'episode',
        index: onEpisodeProps.index
      }
      props.post(message)
    },
    seed: props.input.seed
  })
  const message: DeduceOutput = {
    type: 'state',
    state: deduced
  }
  props.post(message)
})
