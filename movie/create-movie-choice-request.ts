import getCalculatedItem from '@/mergechoice/getCalculatedItem'
import { State } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie, MovieChoiceRequest } from './movie-types'

export default function createMovieChoiceRequest (props: {
  betterIndex: number
  listId: number
  state: State<ListMovie>
}): MovieChoiceRequest {
  if (props.state.choice == null) {
    throw new Error('There is no choice')
  }
  const betterId = props.state.choice?.options[props.betterIndex]
  const worseIndex = 1 - props.betterIndex
  const worseId = props.state.choice?.options[worseIndex]
  if (worseId == null) {
    throw new Error('There is no worseId')
  }
  const betterItem = props.state.items[betterId]
  const worseItem = props.state.items[worseId]
  const aId = props.state.choice.options[props.state.choice.aIndex]
  const bId = props.state.choice.options[props.state.choice.bIndex]
  const aBetter = aId === betterId
  const aItem = getCalculatedItem({ itemId: aId, state: props.state })
  const bItem = getCalculatedItem({ itemId: bId, state: props.state })
  const lastEvent = props.state.history[0]
  if (lastEvent == null) {
    throw new Error('There is no last event')
  }
  const label = `${betterItem.name} > ${worseItem.name}`
  const request: MovieChoiceRequest = {
    choice: {
      aBetter,
      aId,
      aItem,
      betterIndex: props.betterIndex,
      bId,
      bItem,
      random: props.state.choice.random,
      seeded: false
    },
    label,
    lastMergechoiceId: lastEvent.mergeChoiceId,
    listId: props.listId
  }
  return request
}
