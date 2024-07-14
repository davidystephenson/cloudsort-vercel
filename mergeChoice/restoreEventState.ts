import { marion } from './marion/marion'
import { Actors } from './marion/marionTypes'
import { HistoryDataPart, HistoryDataPartListItem, Item, State } from './mergeChoiceTypes'
import restoreArchive from './restoreArchive'
import restoreChoice from './restoreChoice'
import restoreImport from './restoreImport'
import restoreRandom from './restoreRandom'
import restoreRemove from './restoreRemove'
import restoreReset from './restoreReset'
import restoreUnarchive from './restoreUnarchive'

export function marionEventState<ListItem extends Item, Complement, P extends HistoryDataPart<ListItem>> (props: {
  actors: Actors<Complement, State<HistoryDataPartListItem<P>>, P>
  complement: Complement
  part: P
}): State<HistoryDataPartListItem<P>> {
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
