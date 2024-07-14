import guardNumber from '@/guard/guard-number'
import { HistoryEvent } from '@/mergeChoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import guardEventItemData from './guard-event-item-data'
import guardEventChoiceData from './guard-event-choice-data'
import guardModel from '@/guard/guard-model'
import guardUndefined from '@/guard/guard-undefined'
import guardEventImportData from './guard-event-import-data'
import guardEventRandomData from './guard-event-random-data'

export default function guardHistoryEvent (props: {
  label: string
  value: unknown
}): HistoryEvent<ListMovie> {
  const guards = {
    archive: [guardEventItemData, guardUndefined],
    choice: [guardEventChoiceData, guardUndefined],
    createdAt: guardNumber,
    import: [guardEventImportData, guardUndefined],
    mergeChoiceId: guardNumber,
    random: [guardEventRandomData, guardUndefined],
    remove: [guardEventItemData, guardUndefined],
    reset: [guardEventItemData, guardUndefined],
    unarchive: [guardEventItemData, guardUndefined]
  }
  const guarded = guardModel({
    guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
