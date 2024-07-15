import shuffle from './shuffle'
import { AlwaysNever } from './shuffleSliceTypes'

export default function getShuffled <Item> (props: {
  items: Item[]
  slice?: number
} & AlwaysNever): Item[] {
  if (props.never === true) {
    return props.items
  }
  if (props.always === true || props.slice != null) {
    const shuffled = shuffle(props.items)
    return shuffled
  }
  return props.items
}
