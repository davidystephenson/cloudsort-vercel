import { DeduceEpisode } from '@/deduce/deduce-types'
import rewindState from '@/mergechoice/rewindState'
import { RewindInput, RewindOutput, RewindState } from './rewindTypes'
import addMarx from '@/marx-worker/addMarx'

addMarx<RewindInput, RewindOutput>((props) => {
  function handleEpisode (handleEpisodeProps: {
    index: number
  }): void {
    const message: DeduceEpisode = {
      type: 'episode',
      index: handleEpisodeProps.index
    }
    props.post(message)
  }
  const newState = rewindState({
    episodeId: props.input.episodeId,
    history: props.input.state.history,
    onEpisode: handleEpisode,
    seed: props.input.state.seed
  })
  void newState
  const message: RewindState = {
    episodeId: props.input.episodeId,
    lastMergechoiceId: Number(props.input.lastMergechoiceId),
    type: 'state',
    state: newState
  }
  props.post(message)
})
