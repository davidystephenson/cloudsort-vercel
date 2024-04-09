import getItem from './getItem'
import { Item, Operation } from './mergeChoiceTypes'

export default function labelOperation <ListItem extends Item> (props: {
  items: Record<string, ListItem>
  operation: Operation
}): unknown {
  const input1Names = props.operation.input[0].map(id => getItem({ itemId: id, items: props.items }).name)
  const input2Names = props.operation.input[1].map(id => getItem({ itemId: id, items: props.items }).name)
  const outputNames = props.operation.output.map(id => getItem({ itemId: id, items: props.items }).name)
  return {
    input: [input1Names, input2Names],
    mergeChoiceId: props.operation.mergeChoiceId,
    output: outputNames,
    priority: props.operation.priority
  }
}
