import { HistoryResetData, Item, State } from './mergeChoiceTypes'
import resetItem from './resetItem'

export default function restoreReset<ListItem extends Item> (props: {
  input: HistoryResetData<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  const resetState = resetItem({
    itemId: props.input.item.id,
    state: props.state
  })
  return resetState
}
