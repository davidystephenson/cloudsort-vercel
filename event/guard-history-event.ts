import guardNumber from '@/fashion-police/guard-number'
import { HistoryEvent } from '@/mergeChoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import guardEventItemData from './guard-event-item-data'
import guardEventChoiceData from './guard-event-choice-data'
import fashionPolice from '@/fashion-police/fashion-police'
import guardEventImportData from './guard-event-import-data'
import guardEventRandomData from './guard-event-random-data'

export default function guardHistoryEvent (props: {
  label: string
  value: unknown
}): HistoryEvent<ListMovie> {
  const guards = {
    createdAt: guardNumber,
    mergeChoiceId: guardNumber
  }
  const optional = {
    archive: guardEventItemData,
    choice: guardEventChoiceData,
    import: guardEventImportData,
    random: guardEventRandomData,
    remove: guardEventItemData,
    reset: guardEventItemData,
    unarchive: guardEventItemData
  }
  const guarded = fashionPolice({
    required: guards,
    optional,
    label: props.label,
    value: props.value
  })
  return guarded
}
