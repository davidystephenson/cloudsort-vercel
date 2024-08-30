import applyChoice from './applyChoice'
import getItem from './getItem'
import getPoints from './getPoints'
import { Item, State, Calculated } from './mergeChoiceTypes'
import seedChoice from './seedChoice'
import addEpisode from './addEpisode'

export default function chooseOption<ListItem extends Item> (props: {
  betterIndex: number
  debug?: boolean
  seeded?: boolean
  state: State<ListItem>
}): State<ListItem> {
  if (props.state.choice == null) {
    throw new Error('There is no choice.')
  }
  if (props.state.complete) {
    throw new Error('The state is complete')
  }
  const oldState = JSON.parse(JSON.stringify(props.state))
  const aId = props.state.choice.options[props.state.choice.aIndex]
  const bId = props.state.choice.options[props.state.choice.bIndex]
  const aBetter = props.betterIndex === props.state.choice.aIndex
  const aItem = getItem({ itemId: aId, items: props.state.items })
  const bItem = getItem({ itemId: bId, items: props.state.items })
  const appliedState = applyChoice({
    aBetter,
    aItem,
    betterIndex: props.betterIndex,
    bItem,
    debug: props.debug,
    state: props.state
  })
  if (props.seeded !== true) {
    const newAPoints = getPoints({ itemId: aItem.id, state: appliedState })
    const calculatedA: Calculated<ListItem> = {
      ...aItem,
      points: newAPoints
    }
    const newBPoints = getPoints({ itemId: bItem.id, state: appliedState })
    const calculatedB: Calculated<ListItem> = {
      ...bItem,
      points: newBPoints
    }
    const data = {
      choice: {
        aBetter,
        aId: aItem.id,
        aItem: calculatedA,
        betterIndex: props.betterIndex,
        bId: bItem.id,
        bItem: calculatedB,
        random: oldState.choice.random,
        seeded: props.seeded ?? false
      }
    }
    addEpisode({
      data,
      state: appliedState
    })
  }
  return seedChoice({ state: appliedState })
}
