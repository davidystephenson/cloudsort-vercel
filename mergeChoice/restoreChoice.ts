import chooseOption from './chooseOption'
import { HistoryChoiceData, Item, State } from './mergeChoiceTypes'

export default function restoreChoice<ListItem extends Item> (props: {
  input: HistoryChoiceData<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  if (props.input.seeded) {
    return props.state
  }
  console.log('props.state', props.state)
  console.log('props.input.betterIndex', props.input.betterIndex)
  const chosenState = chooseOption({
    state: props.state,
    betterIndex: props.input.betterIndex
  })
  return chosenState
}
