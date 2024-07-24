import { marion } from '@/mergechoice/marion/marion'
import { Actors } from '@/mergechoice/marion/marionTypes'
import { ArchivePart, ChoicePart, EpisodeChoice, ImportPart, EpisodeImport, RandomPart, EpisodeRandom, RemovePart, EpisodeRemove, ResetPart, EpisodePart, Episode } from '@/mergechoice/mergeChoiceTypes'
import getMovieFromEpisodeItem from '@/movie/getMovieFromEpisodeItem'
import { ListMovie } from '@/movie/movie-types'
import { RelatedArchive, RelatedChoice, RelatedImport, RelatedRandom, RelatedRemove, RelatedReset, RelatedUnarchive, RelatedEpisodePart, RelatedEpisode } from './episode-types'

function archiveToHistoryArchive (props: {
  input: RelatedArchive
}): ArchivePart<ListMovie> {
  const movie = getMovieFromEpisodeItem({ episodeItem: props.input.episodeItem })
  const data = { item: movie }
  const part = { archive: data }
  return part
}
function choiceToHistoryArchive (props: {
  input: RelatedChoice
}): ChoicePart<ListMovie> {
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
}): ImportPart<ListMovie> {
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
}): RandomPart<ListMovie> {
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
}): RemovePart<ListMovie> {
  const movie = getMovieFromEpisodeItem({ episodeItem: props.input.episodeItem })
  const data: EpisodeRemove<ListMovie> = { item: movie }
  const part = { remove: data }
  return part
}
function resetToHistoryReset (props: {
  input: RelatedReset
}): ResetPart<ListMovie> {
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
