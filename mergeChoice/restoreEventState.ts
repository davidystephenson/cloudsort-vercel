import { PartKey, Part, State, HistoryEvent, Item } from './mergeChoiceTypes'
import restoreArchive from './restoreArchive'
import restoreChoice from './restoreChoice'
import restoreImport from './restoreImport'
import restoreRandom from './restoreRandom'
import restoreRemove from './restoreRemove'
import restoreReset from './restoreReset'
import restoreUnarchive from './restoreUnarchive'

type Input<ListItem extends Item, K extends PartKey<ListItem>> = NonNullable<Part<ListItem>[K]>
type Actor<ListItem extends Item, O, K extends PartKey<ListItem>> = (props: {
  data: Input<ListItem, K>
  state: State<ListItem>
}) => O
type Actors<ListItem extends Item, O> = {
  [K in PartKey<ListItem>]: Actor<ListItem, O, K>
}
type Director<ListItem extends Item, O> = <K extends PartKey<ListItem>>(props: {
  actor: Actor<ListItem, O, K>
  input: Input<ListItem, K>
}) => O
class AuditionError extends Error { }
const audition = <ListItem extends Item, O, K extends PartKey<ListItem>>(props: {
  actors: Actors<ListItem, O>
  part: Part<ListItem>
  director: Director<ListItem, O>
  key: K
}): O => {
  const input = props.part[props.key]
  if (input == null) {
    throw new AuditionError()
  }
  const actor = props.actors[props.key]
  const output = props.director({ actor, input })
  return output
}
export const marion = <ListItem extends Item, O>(props: {
  actors: Actors<ListItem, O>
  part: Part<ListItem>
  director: Director<ListItem, O>
}): O => {
  let key: PartKey<ListItem>
  for (key in props.actors) {
    try {
      const result = audition({
        actors: props.actors,
        part: props.part,
        director: props.director,
        key
      })
      return result
    } catch (error) {
      if (error instanceof AuditionError) {
        continue
      }
      throw error
    }
  }
  throw new Error('No match found')
}

// function restoreArchive<ListItem extends Item> (props: {
//   data: HistoryArchiveData<ListItem>
//   state: State<ListItem>
// }): State<ListItem> {
//   const resetState = archiveItem({
//     itemId: props.data.item.id,
//     state: props.state
//   })
//   return resetState
// }

// const restorers = { archive: restoreArchive }

// function restoreEventOld<ListItem extends Item> (props: {
//   event: HistoryEvent<ListItem>
//   state: State<ListItem>
// }): State<ListItem> {
//   const mapped = marion({
//     actors: { archive: restoreArchive },
//     part: props.event,
//     director: ({ actor, input }): State<ListItem> => actor({ data: input, state: props.state })
//   })
//   return mapped
// }

// function deduceStateOld<ListItem extends Item> (props: {
//   history: Array<HistoryEvent<ListItem>>
//   seed: string
// }): State<ListItem> {
//   const initial = createState<ListItem>({ seed: props.seed })
//   const reversed = props.history.slice().reverse()
//   const deduced = reversed.reduce<State<ListItem>>((state, event) => {
//     const restoredState = restoreEvent({
//       event,
//       state
//     })
//     const lastEvent = restoredState.history[0]
//     lastEvent.createdAt = event.createdAt
//     return restoredState
//   }, initial)
//   return deduced
// }

export function marionEvent<ListItem extends Item, Output> (props: {
  actors: Actors<ListItem, Output>
  part: HistoryEvent<ListItem>
  director: Director<ListItem, Output>
}): Output {
  const output = marion({
    actors: props.actors,
    part: props.part,
    director: props.director
  })
  return output
}

export function marionEventState<ListItem extends Item> (props: {
  actors: Actors<ListItem, State<ListItem>>
  part: HistoryEvent<ListItem>
  director: Director<ListItem, State<ListItem>>
}): State<ListItem> {
  const mapped = marion({
    actors: props.actors,
    part: props.part,
    director: props.director
  })
  return mapped
}

export default function restoreEventState<ListItem extends Item> (restoreStateProps: {
  event: HistoryEvent<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  const restoredState = marionEventState({
    actors: {
      archive: restoreArchive,
      choice: restoreChoice,
      import: restoreImport,
      random: restoreRandom,
      remove: restoreRemove,
      reset: restoreReset,
      unarchive: restoreUnarchive
    },
    part: restoreStateProps.event,
    director: ({ actor, input }): State<ListItem> => actor({ data: input, state: restoreStateProps.state })
  })
  return restoredState
}
