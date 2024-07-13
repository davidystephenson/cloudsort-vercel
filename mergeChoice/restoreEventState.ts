import { HistoryDataPart, State, Item, Actors, PartListItem, UnknownParts } from './mergeChoiceTypes'
import restoreArchive from './restoreArchive'
import restoreChoice from './restoreChoice'
import restoreImport from './restoreImport'
import restoreRandom from './restoreRandom'
import restoreRemove from './restoreRemove'
import restoreReset from './restoreReset'
import restoreUnarchive from './restoreUnarchive'

class AuditionError extends Error { }
const audition = <Complement, O, P extends UnknownParts, K extends keyof P>(props: {
  actors: Actors<Complement, O, P>
  complement: Complement
  part: P
  key: K
}): O => {
  const input = props.part[props.key]
  if (input == null) {
    throw new AuditionError()
  }
  const actor = props.actors[props.key]
  const output = actor({ input, ...props.complement })
  return output
}

export const marion = <Complement, Output, P extends UnknownParts>(props: {
  actors: Actors<Complement, Output, P>
  complement: Complement
  part: P
}): Output => {
  let key: keyof P
  for (key in props.part) {
    try {
      const result = audition({
        actors: props.actors,
        complement: props.complement,
        part: props.part,
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

export function marionEventState<ListItem extends Item, Complement, P extends HistoryDataPart<ListItem>> (props: {
  actors: Actors<Complement, State<PartListItem<P>>, P>
  complement: Complement
  part: P
}): State<PartListItem<P>> {
  const mapped = marion(props)
  return mapped
}

export default function restoreEventState<ListItem extends Item> (props: {
  event: HistoryDataPart<ListItem>
  state: State<ListItem>
}): State<ListItem> {
  // const actors: Actors<{ state: State<ListItem> }, State<ListItem>, HistoryDataPart<ListItem>> = {
  //   archive: restoreArchive,
  //   choice: restoreChoice,
  //   import: restoreImport,
  //   random: restoreRandom,
  //   remove: restoreRemove,
  //   reset: restoreReset,
  //   unarchive: restoreUnarchive
  // }
  // void actors
  const restoredState = marionEventState({
    // actors,
    actors: {
      archive: restoreArchive,
      choice: restoreChoice,
      import: restoreImport,
      random: restoreRandom,
      remove: restoreRemove,
      reset: restoreReset,
      unarchive: restoreUnarchive
    },
    complement: { state: props.state },
    part: props.event
  })
  return restoredState
}
