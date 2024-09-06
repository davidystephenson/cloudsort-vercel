import createState from './createState'
import { Episode, Item, State } from './mergeChoiceTypes'
import restoreEpisodeState from './restoreEpisodeState'

export default function deduceState<ListItem extends Item> (props: {
  history: Array<Episode<ListItem>>
  onEpisode?: (props: {
    index: number
  }) => void
  seed: string
}): State<ListItem> {
  const initial = createState<ListItem>({ seed: props.seed })
  const clonedHistory = structuredClone(props.history)
  const reversed = clonedHistory.reverse()
  const deduced = reversed.reduce<State<ListItem>>((state, episode, index) => {
    console.log('before')
    props.onEpisode?.({ index })
    console.log('after')
    const restoredState = restoreEpisodeState({ episode, state })
    console.log('restoredState', restoredState)
    const lastEpisode = restoredState.history[0]
    lastEpisode.createdAt = episode.createdAt
    return restoredState
  }, initial)
  return deduced
}
