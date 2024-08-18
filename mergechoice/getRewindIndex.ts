import { Item, State } from './mergeChoiceTypes'

export default function getRewindIndex <ListItem extends Item> (props: {
  episodeId: number
  state: State<ListItem>
}): number {
  const index = props.state.history.findIndex(
    episode => episode.mergeChoiceId === props.episodeId
  )
  if (index === -1) {
    throw new Error('There is no episode')
  }
  return index
}
