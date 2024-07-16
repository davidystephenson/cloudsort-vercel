import { marion } from '@/mergeChoice/marion/marion'
import { Actors } from '@/mergeChoice/marion/marionTypes'
import { HistoryDataPart, Item } from '@/mergeChoice/mergeChoiceTypes'
import ArchiveEventView from './archive-event-view'
import ChoiceEventView from './choice-event-view'
import historyEventContext from './history-event-context'
import ImportEventView from './import-event-view'
import RandomEventView from './random-event-view'
import RemoveEventView from './remove-event-view'
import ResetEventView from './reset-event-view'
import UnarchiveEventView from './unarchive-event-view'

export function marionHistoryElement<
  ListItem extends Item,
  Complement,
> (props: {
  actors: Actors<Complement, JSX.Element, HistoryDataPart<ListItem>>
  complement: Complement
  part: HistoryDataPart<ListItem>
}): JSX.Element {
  const mapped = marion(props)
  return mapped
}

export default function HistoryEventView (): JSX.Element {
  const historyEvent = historyEventContext.useContext()
  const views = {
    archive: ArchiveEventView,
    choice: ChoiceEventView,
    import: ImportEventView,
    random: RandomEventView,
    remove: RemoveEventView,
    reset: ResetEventView,
    unarchive: UnarchiveEventView
  }
  const element = marionHistoryElement({
    actors: views,
    complement: {},
    part: historyEvent.event
  })
  const view = <>{element}</>
  return view
}
