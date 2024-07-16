import { EpisodePart, RelatedArchive, RelatedChoice, RelatedEpisode, RelatedImport, RelatedRandom, RelatedRemove, RelatedReset, RelatedUnarchive } from '@/event/event-types'
import deduceState from '@/mergeChoice/deduceState'
import getMovieFromEpisodeItem from '@/movie/getMovieFromEventItem'
import { ListMovie } from '@/movie/movie-types'
import { HistoryArchivePart, HistoryChoiceData, HistoryChoicePart, HistoryDataPart, Episode, HistoryImportData, HistoryImportPart, HistoryRandomData, HistoryRandomPart, HistoryRemoveData, HistoryRemovePart, HistoryResetPart } from '../mergeChoice/mergeChoiceTypes'
import { MergechoiceList, RelatedList } from './list-types'
import { marion } from '@/mergeChoice/marion/marion'
import { Actors } from '@/mergeChoice/marion/marionTypes'

function archiveToHistoryArchive (props: {
  input: RelatedArchive
}): HistoryArchivePart<ListMovie> {
  const movie = getMovieFromEpisodeItem({ episodeItem: props.input.episodeItem })
  const data = { item: movie }
  const part = { archive: data }
  return part
}
function choiceToHistoryArchive (props: {
  input: RelatedChoice
}): HistoryChoicePart<ListMovie> {
  const aMovie = getMovieFromEpisodeItem({ episodeItem: props.input.aEpisodeItem })
  const bMovie = getMovieFromEpisodeItem({ episodeItem: props.input.bEpisodeItem })
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
  const movies = props.input.episodeItems.map((episodeItem) => {
    const movie = getMovieFromEpisodeItem({ episodeItem })
    return movie
  })
  const data: HistoryImportData<ListMovie> = { items: movies }
  const part = { import: data }
  return part
}
function randomToHistoryRandom (props: {
  input: RelatedRandom
}): HistoryRandomPart<ListMovie> {
  const firstMovie = getMovieFromEpisodeItem({ episodeItem: props.input.firstEpisodeItem })
  const secondMovie = getMovieFromEpisodeItem({ episodeItem: props.input.secondEpisodeItem })
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
  const movie = getMovieFromEpisodeItem({ episodeItem: props.input.episodeItem })
  const data: HistoryRemoveData<ListMovie> = { item: movie }
  const part = { remove: data }
  return part
}
function resetToHistoryReset (props: {
  input: RelatedReset
}): HistoryResetPart<ListMovie> {
  const movie = getMovieFromEpisodeItem({ episodeItem: props.input.episodeItem })
  const data: HistoryRemoveData<ListMovie> = { item: movie }
  const part = { reset: data }
  return part
}
function unarchiveToHistoryUnarchive (props: {
  input: RelatedUnarchive
}): HistoryDataPart<ListMovie> {
  const movie = getMovieFromEpisodeItem({ episodeItem: props.input.episodeItem })
  const data = { unarchive: { item: movie } }
  return data
}

export function marionEpisodePart<Complement> (props: {
  actors: Actors<Complement, HistoryDataPart<ListMovie>, EpisodePart>
  complement: Complement
  part: EpisodePart
}): HistoryDataPart<ListMovie> {
  const marioned = marion({
    actors: props.actors,
    complement: props.complement,
    part: props.part
  })
  return marioned
}

export function episodeToHistoryEpisode (props: {
  episode: RelatedEpisode
}): Episode<ListMovie> {
  const data = marionEpisodePart({
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
    part: props.episode
  })
  const createdAt = props.episode.createdAt.getTime()
  const historyEpisode: Episode<ListMovie> = { createdAt, mergeChoiceId: props.episode.mergeChoiceId, ...data }
  return historyEpisode
}

export default async function getMergechoiceList (props: {
  list: RelatedList
}): Promise<MergechoiceList> {
  const history: Array<Episode<ListMovie>> = props.list.episodes.map((episode) => {
    const historyEpisode = episodeToHistoryEpisode({ episode })
    return historyEpisode
  })
  // console.log('history', history)
  const state = deduceState({ history, seed: props.list.seed })
  const mergechoiceList = {
    list: props.list,
    state
  }
  return mergechoiceList
}
