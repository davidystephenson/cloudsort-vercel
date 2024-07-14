import isResult from './isResult'
import { HistoryEvent } from '@/mergeChoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export default function isEventResult ({
  event,
  query
}: {
  event: HistoryEvent<ListMovie>
  query: string
}): boolean {
  if (query === '') {
    return true
  }
  if (event.choice != null) {
    const aResult = isResult({ movie: event.choice.aItem, query })
    if (aResult) {
      return true
    }
    const bResult = isResult({ movie: event.choice.bItem, query })
    if (bResult) {
      return true
    }
    return false
  }
  if (event.import != null) {
    return event.import.items.some(item => isResult({ movie: item, query }))
  }
  if (event.remove != null) {
    return isResult({ movie: event.remove.item, query })
  }
  const json = JSON.stringify(event)
  const message = `Unexpected event: ${json}`
  throw new Error(message)
}
