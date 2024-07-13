import deduceState from '@/mergeChoice/deduceState'
import { marion, marionHistoryEventState } from '@/mergeChoice/restoreEventState'
import getMovieFromEventItem from '@/movie/getMovieFromEventItem'
import { ListMovie } from '@/movie/movie-types'
import { Actors, HistoryArchiveData, HistoryChoiceData, HistoryEvent, HistoryImportData, HistoryRandomData, HistoryRemoveData, Item, HistoryDataPart, PartListItem, State, Part, Actor, Input } from '../mergeChoice/mergeChoiceTypes'
import { MergechoiceList, RelatedList } from './list-types'
import { RelatedArchive, RelatedChoice, RelatedEvent, RelatedEventItem, RelatedImport, RelatedRandom, RelatedRemove, RelatedReset, RelatedUnarchive } from '@/event/event-types'
import { arch } from 'os'

function archiveToHistoryArchive (props: {
  archive: RelatedArchive
}): HistoryArchiveData<ListMovie> {
  const movie = getMovieFromEventItem({ eventItem: props.archive.eventItem })
  const data = {
    item: movie
  }
  return data
}
function choiceToHistoryArchive (props: {
  choice: RelatedChoice
}): HistoryChoiceData<ListMovie> {
  const aMovie = getMovieFromEventItem({ eventItem: props.choice.aEventItem })
  const bMovie = getMovieFromEventItem({ eventItem: props.choice.bEventItem })
  const data: HistoryChoiceData<ListMovie> = {
    aBetter: props.choice.aBetter,
    aId: aMovie.id,
    aItem: aMovie,
    betterIndex: props.choice.betterIndex,
    bId: bMovie.id,
    bItem: bMovie,
    random: props.choice.random,
    seeded: props.choice.seeded
  }
  return data
}
function importToHistoryImport (props: {
  import: RelatedImport
}): HistoryImportData<ListMovie> {
  const movies = props.import.eventItems.map((eventItem) => {
    const movie = getMovieFromEventItem({ eventItem })
    return movie
  })
  const data: HistoryImportData<ListMovie> = {
    items: movies
  }
  return data
}
function randomToHistoryRandom (props: {
  random: RelatedRandom
}): HistoryRandomData<ListMovie> {
  const firstMovie = getMovieFromEventItem({ eventItem: props.random.firstEventItem })
  const secondMovie = getMovieFromEventItem({ eventItem: props.random.secondEventItem })
  const data: HistoryRandomData<ListMovie> = {
    first: firstMovie,
    second: secondMovie
  }
  return data
}
function removeToHistoryRemove (props: {
  remove: RelatedRemove
}): HistoryRemoveData<ListMovie> {
  const movie = getMovieFromEventItem({ eventItem: props.remove.eventItem })
  const data: HistoryRemoveData<ListMovie> = {
    item: movie
  }
  return data
}
function resetToHistoryReset (props: {
  reset: RelatedReset
}): HistoryRemoveData<ListMovie> {
  const movie = getMovieFromEventItem({ eventItem: props.reset.eventItem })
  const data: HistoryRemoveData<ListMovie> = {
    item: movie
  }
  return data
}
function unarchiveToHistoryUnarchive (props: {
  unarchive: RelatedUnarchive
}): Input<HistoryEvent<ListMovie>, 'unarchive'> {
  const movie = getMovieFromEventItem({ eventItem: props.unarchive.eventItem })
  const data = {
    item: movie
  }
  return data
}

export function marionEventPart<Complement, P extends EventPart> (props: {
  actors: Actors<Complement, HistoryDataPart<ListMovie>, P>
  complement: Complement
  part: P
}): HistoryDataPart<ListMovie> {
  const mapped = marion({
    actors: props.actors,
    complement: props.complement,
    part: props.part
  })
  return mapped
}

const x = 1 as unknown as RelatedEvent
const y: HistoryDataPart<ListMovie> = x
console.log(y)
type EventPart = Part<RelatedEvent>

const a: Actor<
{},
Input<HistoryEvent<ListMovie>, keyof HistoryEvent<ListMovie>>,
RelatedEvent,
'archive'
> = archiveToHistoryArchive
void a

function rowToEvent (props: {
  event: RelatedEvent
}): HistoryEvent<ListMovie> {
  const converters: Actors<
  {},
  Input<HistoryEvent<ListMovie>, keyof HistoryEvent<ListMovie>>,
  RelatedEvent
  > = {
    archive: archiveToHistoryArchive,
    choice: choiceToHistoryArchive,
    import: importToHistoryImport,
    random: randomToHistoryRandom,
    remove: removeToHistoryRemove,
    reset: resetToHistoryReset,
    unarchive: unarchiveToHistoryUnarchive
  }
  const data = marionEventPart({
    actors: converters,
    complement: {},
    part: props.event
  })
  const createdAt = props.event.createdAt.getTime()
  const historyEvent: HistoryEvent<ListMovie> = { ...props.event, createdAt, ...data }
  return historyEvent
}

export default async function getMergechoiceList (props: {
  list: RelatedList
}): Promise<MergechoiceList> {
  const history: Array<HistoryEvent<ListMovie>> = props.list.events.map((event) => {
    const historyEvent = marion({
      actors: {
        archive: (props) => {
          const movie = getMovieFromEventItem({ eventItem: props.input.eventItem })
          const data: HistoryArchiveData<ListMovie> = {
            item: movie
          }
          return data
        }
      },
      complement: {},
      part: event
    })
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
