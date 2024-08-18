import deduceState from './deduceState'
import getRewindIndex from './getRewindIndex'
import { Item, State } from './mergeChoiceTypes'

export default function rewindState <ListItem extends Item> (props: {
  episodeId: number
  onEpisode?: (props: {
    index: number
  }) => void
  state: State<ListItem>
}): State<ListItem> {
  const index = getRewindIndex({
    episodeId: props.episodeId,
    state: props.state
  })
  const episodes = props.state.history.slice(index + 1)
  const newState = deduceState({
    history: episodes,
    onEpisode: props.onEpisode,
    seed: props.state.seed
  })
  return newState
}
