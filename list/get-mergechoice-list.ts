import { RelatedArchive, RelatedChoice, RelatedEvent, RelatedImport, RelatedRandom, RelatedRemove, RelatedReset, RelatedUnarchive } from '@/event/event-types'
import deduceState from '@/mergeChoice/deduceState'
import getMovieFromEventItem from '@/movie/getMovieFromEventItem'
import { ListMovie } from '@/movie/movie-types'
import { HistoryArchivePart, HistoryChoiceData, HistoryChoicePart, HistoryDataPart, HistoryEvent, HistoryImportData, HistoryImportPart, HistoryRandomData, HistoryRandomPart, HistoryRemoveData, HistoryRemovePart, HistoryResetPart } from '../mergeChoice/mergeChoiceTypes'
import { MergechoiceList, RelatedList } from './list-types'
import { marion } from '@/mergeChoice/marion/marion'
import { Actors, Part } from '@/mergeChoice/marion/marionTypes'

function archiveToHistoryArchive (props: {
  input: RelatedArchive
}): HistoryArchivePart<ListMovie> {
  const movie = getMovieFromEventItem({ eventItem: props.input.eventItem })
  const data = { item: movie }
  const part = { archive: data }
  return part
}
function choiceToHistoryArchive (props: {
  input: RelatedChoice
}): HistoryChoicePart<ListMovie> {
  const aMovie = getMovieFromEventItem({ eventItem: props.input.aEventItem })
  const bMovie = getMovieFromEventItem({ eventItem: props.input.bEventItem })
  const data: HistoryChoiceData<ListMovie> = {
    aBetter: props.input.aBetter,
    aId: aMovie.id,
    aItem: aMovie,
    betterIndex: props.input.betterIndex,
    bId: bMovie.id,
    bItem: bMovie,
    random: props.input.random,
    seeded: props.input.seeded
  }
  const part = { choice: data }
  return part
}
function importToHistoryImport (props: {
  input: RelatedImport
}): HistoryImportPart<ListMovie> {
  const movies = props.input.eventItems.map((eventItem) => {
    const movie = getMovieFromEventItem({ eventItem })
    return movie
  })
  const data: HistoryImportData<ListMovie> = { items: movies }
  const part = { import: data }
  return part
}
function randomToHistoryRandom (props: {
  input: RelatedRandom
}): HistoryRandomPart<ListMovie> {
  const firstMovie = getMovieFromEventItem({ eventItem: props.input.firstEventItem })
  const secondMovie = getMovieFromEventItem({ eventItem: props.input.secondEventItem })
  const data: HistoryRandomData<ListMovie> = {
    first: firstMovie,
    second: secondMovie
  }
  const part = { random: data }
  return part
}
function removeToHistoryRemove (props: {
  input: RelatedRemove
}): HistoryRemovePart<ListMovie> {
  const movie = getMovieFromEventItem({ eventItem: props.input.eventItem })
  const data: HistoryRemoveData<ListMovie> = { item: movie }
  const part = { remove: data }
  return part
}
function resetToHistoryReset (props: {
  input: RelatedReset
}): HistoryResetPart<ListMovie> {
  const movie = getMovieFromEventItem({ eventItem: props.input.eventItem })
  const data: HistoryRemoveData<ListMovie> = { item: movie }
  const part = { reset: data }
  return part
}
function unarchiveToHistoryUnarchive (props: {
  input: RelatedUnarchive
}): HistoryDataPart<ListMovie> {
  const movie = getMovieFromEventItem({ eventItem: props.input.eventItem })
  const data = { unarchive: { item: movie } }
  return data
}

export function marionEventPart<Complement> (props: {
  actors: Actors<Complement, HistoryDataPart<ListMovie>, EventPart>
  complement: Complement
  part: EventPart
}): HistoryDataPart<ListMovie> {
  const mapped = marion({
    actors: props.actors,
    complement: props.complement,
    part: props.part
  })
  return mapped
}

type EventPart = Part<RelatedEvent>

export function eventToHistoryEvent (props: {
  event: RelatedEvent
}): HistoryEvent<ListMovie> {
  const data = marionEventPart({
    actors: {
      archive: archiveToHistoryArchive,
      choice: choiceToHistoryArchive,
      import: importToHistoryImport,
      random: randomToHistoryRandom,
      remove: removeToHistoryRemove,
      reset: resetToHistoryReset,
      unarchive: unarchiveToHistoryUnarchive
    },
    complement: {},
    part: props.event
  })
  const createdAt = props.event.createdAt.getTime()
  const historyEvent: HistoryEvent<ListMovie> = { createdAt, mergeChoiceId: props.event.mergeChoiceId, ...data }
  return historyEvent
}

export default async function getMergechoiceList (props: {
  list: RelatedList
}): Promise<MergechoiceList> {
  const history: Array<HistoryEvent<ListMovie>> = props.list.events.map((event) => {
    const historyEvent = eventToHistoryEvent({ event })
    return historyEvent
  })
  const state = deduceState({ history, seed: props.list.seed })

  return {
    list: props.list,
    state
  }
}
