import { HistoryArchiveData, HistoryChoiceData, HistoryEvent, HistoryImportData, HistoryRandomData, HistoryRemoveData } from '../mergeChoice/mergeChoiceTypes'
import { MergechoiceList, RelatedList } from './list-types'
import deduceState from '@/mergeChoice/deduceState'
import { ListMovie } from '@/movie/movie-types'
import getMovieFromEventItem from '@/movie/getMovieFromEventItem'

export default async function getMergechoiceList (props: {
  list: RelatedList
}): Promise<MergechoiceList> {
  const history: Array<HistoryEvent<ListMovie>> = props.list.events.map((event) => {
    if (event.archive != null) {
      const movie = getMovieFromEventItem({ eventItem: event.archive.eventItem })
      const data: HistoryArchiveData<ListMovie> = {
        item: movie
      }
      const createdAt = event.createdAt.getTime()
      const historyEvent: HistoryEvent<ListMovie> = {
        archive: data,
        createdAt,
        mergeChoiceId: event.mergeChoiceId
      }
      return historyEvent
    }
    if (event.choice != null) {
      const aMovie = getMovieFromEventItem({ eventItem: event.choice.aEventItem })
      const bMovie = getMovieFromEventItem({ eventItem: event.choice.bEventItem })
      const data: HistoryChoiceData<ListMovie> = {
        aBetter: event.choice.aBetter,
        aId: aMovie.id,
        aItem: aMovie,
        betterIndex: event.choice.betterIndex,
        bId: bMovie.id,
        bItem: bMovie,
        random: event.choice.random,
        seeded: event.choice.seeded
      }
      const historyEvent: HistoryEvent<ListMovie> = {
        choice: data,
        createdAt: event.createdAt.getTime(),
        mergeChoiceId: event.mergeChoiceId
      }
      return historyEvent
    }
    if (event.import != null) {
      const movies = event.import.eventItems.map((eventItem) => {
        const movie = getMovieFromEventItem({ eventItem })
        return movie
      })
      const data: HistoryImportData<ListMovie> = {
        items: movies
      }
      const historyEvent: HistoryEvent<ListMovie> = {
        import: data,
        createdAt: event.createdAt.getTime(),
        mergeChoiceId: event.mergeChoiceId
      }
      return historyEvent
    }
    if (event.random != null) {
      const firstMovie = getMovieFromEventItem({ eventItem: event.random.firstEventItem })
      const secondMovie = getMovieFromEventItem({ eventItem: event.random.secondEventItem })
      const data: HistoryRandomData<ListMovie> = {
        first: firstMovie,
        second: secondMovie
      }
      const historyEvent: HistoryEvent<ListMovie> = {
        random: data,
        createdAt: event.createdAt.getTime(),
        mergeChoiceId: event.mergeChoiceId
      }
      return historyEvent
    }
    if (event.remove != null) {
      const movie = getMovieFromEventItem({ eventItem: event.remove.eventItem })
      const data: HistoryRemoveData<ListMovie> = {
        item: movie
      }
      const historyEvent: HistoryEvent<ListMovie> = {
        remove: data,
        createdAt: event.createdAt.getTime(),
        mergeChoiceId: event.mergeChoiceId
      }
      return historyEvent
    }
    if (event.reset != null) {
      const movie = getMovieFromEventItem({ eventItem: event.reset.eventItem })
      const data: HistoryRemoveData<ListMovie> = {
        item: movie
      }
      const historyEvent: HistoryEvent<ListMovie> = {
        reset: data,
        createdAt: event.createdAt.getTime(),
        mergeChoiceId: event.mergeChoiceId
      }
      return historyEvent
    }
    if (event.unarchive != null) {
      const movie = getMovieFromEventItem({ eventItem: event.unarchive.eventItem })
      const data: HistoryArchiveData<ListMovie> = {
        item: movie
      }
      const historyEvent: HistoryEvent<ListMovie> = {
        unarchive: data,
        createdAt: event.createdAt.getTime(),
        mergeChoiceId: event.mergeChoiceId
      }
      return historyEvent
    }
    throw new Error('Invalid event data')
  })
  const state = deduceState({ history, seed: props.list.seed })

  return {
    list: props.list,
    state
  }
}
