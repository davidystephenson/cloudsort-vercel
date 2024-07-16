import { RelatedEpisodePart, RelatedArchive, RelatedChoice, RelatedEpisode, RelatedImport, RelatedRandom, RelatedRemove, RelatedReset, RelatedUnarchive } from '@/episode/episode-types'
import deduceState from '@/mergechoice/deduceState'
import getMovieFromEpisodeItem from '@/movie/getMovieFromEpisodeItem'
import { ListMovie } from '@/movie/movie-types'
import { EpisodeArchivePart, EpisodeChoice, EpisodeChoicePart, Episode, EpisodeImport, EpisodeImportPart, EpisodeRandom, EpisodeRandomPart, EpisodeRemove, EpisodeRemovePart, EpisodeResetPart, EpisodePart } from '../mergechoice/mergeChoiceTypes'
import { MergechoiceList, RelatedList } from './list-types'
import { marion } from '@/mergechoice/marion/marion'
import { Actors } from '@/mergechoice/marion/marionTypes'

function archiveToHistoryArchive (props: {
  input: RelatedArchive
}): EpisodeArchivePart<ListMovie> {
  const movie = getMovieFromEpisodeItem({ episodeItem: props.input.episodeItem })
  const data = { item: movie }
  const part = { archive: data }
  return part
}
function choiceToHistoryArchive (props: {
  input: RelatedChoice
}): EpisodeChoicePart<ListMovie> {
  const aMovie = getMovieFromEpisodeItem({ episodeItem: props.input.aEpisodeItem })
  const bMovie = getMovieFromEpisodeItem({ episodeItem: props.input.bEpisodeItem })
  const data: EpisodeChoice<ListMovie> = {
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
}): EpisodeImportPart<ListMovie> {
  const movies = props.input.episodeItems.map((episodeItem) => {
    const movie = getMovieFromEpisodeItem({ episodeItem })
    return movie
  })
  const data: EpisodeImport<ListMovie> = { items: movies }
  const part = { import: data }
  return part
}
function randomToHistoryRandom (props: {
  input: RelatedRandom
}): EpisodeRandomPart<ListMovie> {
  const firstMovie = getMovieFromEpisodeItem({ episodeItem: props.input.firstEpisodeItem })
  const secondMovie = getMovieFromEpisodeItem({ episodeItem: props.input.secondEpisodeItem })
  const data: EpisodeRandom<ListMovie> = {
    first: firstMovie,
    second: secondMovie
  }
  const part = { random: data }
  return part
}
function removeToHistoryRemove (props: {
  input: RelatedRemove
}): EpisodeRemovePart<ListMovie> {
  const movie = getMovieFromEpisodeItem({ episodeItem: props.input.episodeItem })
  const data: EpisodeRemove<ListMovie> = { item: movie }
  const part = { remove: data }
  return part
}
function resetToHistoryReset (props: {
  input: RelatedReset
}): EpisodeResetPart<ListMovie> {
  const movie = getMovieFromEpisodeItem({ episodeItem: props.input.episodeItem })
  const data: EpisodeRemove<ListMovie> = { item: movie }
  const part = { reset: data }
  return part
}
function unarchiveToHistoryUnarchive (props: {
  input: RelatedUnarchive
}): EpisodePart<ListMovie> {
  const movie = getMovieFromEpisodeItem({ episodeItem: props.input.episodeItem })
  const data = { unarchive: { item: movie } }
  return data
}

export function marionEpisodePart<Complement> (props: {
  actors: Actors<Complement, EpisodePart<ListMovie>, RelatedEpisodePart>
  complement: Complement
  part: RelatedEpisodePart
}): EpisodePart<ListMovie> {
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
  const state = deduceState({ history, seed: props.list.seed })
  const mergechoiceList = {
    list: props.list,
    state
  }
  return mergechoiceList
}
