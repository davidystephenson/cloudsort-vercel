import getShuffled from './getShuffled'
import { AlwaysNever } from './shuffleSliceTypes'

export default function shuffleSlice <Item> (props: {
  items: Item[]
  slice?: number
} & AlwaysNever): Item[] {
  const shuffled = getShuffled(props)
  const slicing = props.slice != null
  if (slicing) {
    const sliced = shuffled.slice(0, props.slice)
    return sliced
  }
  return shuffled
}
