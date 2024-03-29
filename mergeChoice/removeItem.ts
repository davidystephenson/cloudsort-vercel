import yeast from 'yeast'
import createActiveChoice from './createActiveChoice'
import getPoints from './getPoints'
import removeFromOperations from './removeFromOperations'
import setupChoice from './setupChoice'
import { Item, State, HistoryEvent, Calculated, ItemId } from './merge-choice-types'
import getItem from './getItem'

export default function removeItem <ListItem extends Item> (props: {
  id: ItemId
  state: State<ListItem>
}): State<ListItem> {
  const item = getItem({ id: props.id, items: props.state.items })
  const statePoints = getPoints({ itemId: props.id, state: props.state })
  const historyItem: Calculated<ListItem> = { ...item, points: statePoints }
  const oldState = JSON.parse(JSON.stringify(props.state))
  const { [props.id]: removedItem, ...newItems } = props.state.items
  void removedItem
  props.state.items = newItems
  props.state.activeIds = props.state.activeIds.filter(activeId => activeId !== props.id)
  props.state.reserveIds = props.state.reserveIds.filter(reserveId => reserveId !== props.id)
  props.state.betterIds = props.state.betterIds.filter(betterId => betterId !== props.id)
  props.state.worseIds = props.state.worseIds.filter(worseId => worseId !== props.id)
  const activeRemoval = removeFromOperations({
    itemId: props.id,
    operations: props.state.activeOperations
  })
  props.state.activeOperations = activeRemoval.operations
  props.state.betterOperations = removeFromOperations({ itemId: props.id, operations: props.state.betterOperations }).operations
  props.state.worseOperations = removeFromOperations({ itemId: props.id, operations: props.state.worseOperations }).operations
  const { history, ...previousState } = oldState
  void history
  const removeEvent: HistoryEvent<ListItem> = {
    createdAt: Date.now(),
    remove: {
      id: props.id,
      item: historyItem
    },
    mergeChoiceId: yeast(),
    previousState
  }
  props.state.history.unshift(removeEvent)

  const emptiedCurrentOperation = activeRemoval.emptiedOperationId === props.state.choice?.operationMergeChoiceId
  if (emptiedCurrentOperation) {
    return setupChoice({
      state: props.state
    })
  } else if (props.state.choice?.options.includes(props.id) === true) {
    props.state.choice = createActiveChoice({
      activeOperations: props.state.activeOperations
    })
  }
  return props.state
}
