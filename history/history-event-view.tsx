import { marion } from '@/mergeChoice/marion/marion'
import { Actors } from '@/mergeChoice/marion/marionTypes'
import { HistoryDataPart, Item } from '@/mergeChoice/mergeChoiceTypes'
import historyContext from './history-context'
import HistoryArchiveView from './history-archive-view'
import HistoryChoiceView from './history-choice-view'
import HistoryImportView from './history-import-view'
import HistoryRandomView from './history-random-view'
import HistoryRemoveView from './history-remove-view'
import HistoryResetView from './history-reset-view'
import HistoryUnarchiveView from './history-unarchive-view'

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
  const historyEvent = historyContext.useContext()
  const views = {
    archive: HistoryArchiveView,
    choice: HistoryChoiceView,
    import: HistoryImportView,
    random: HistoryRandomView,
    remove: HistoryRemoveView,
    reset: HistoryResetView,
    unarchive: HistoryUnarchiveView
  }
  const element = marionHistoryElement({
    actors: views,
    complement: {},
    part: historyEvent.event
  })
  const view = <>{element}</>
  return view
}
