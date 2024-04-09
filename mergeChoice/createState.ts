import { Item, State } from './mergeChoiceTypes'

export default function createState <ListItem extends Item> (): State<ListItem> {
  const seed = String(Math.random())
  return {
    activeIds: [],
    activeOperations: {},
    betterIds: [],
    betterOperations: {},
    choice: {
      aIndex: 0,
      bIndex: 1,
      mergeChoiceId: 0,
      options: [],
      random: false
    },
    choiceCount: 0,
    complete: false,
    history: [],
    itemCount: 0,
    items: {},
    operationCount: 0,
    reserveIds: [],
    seed,
    worseIds: [],
    worseOperations: {}
  }
}
