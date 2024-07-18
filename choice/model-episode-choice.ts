import { EpisodeChoice } from '@/mergechoice/mergeChoiceTypes'
import { RelatedEpisode } from '../episode/episode-types'
import { ListMovie } from '@/movie/movie-types'
import modelEpisodeMovie from '../episode/model-episode-movie'

export default function modelEpisodeChoice (props: {
  episode: RelatedEpisode
}): EpisodeChoice<ListMovie> {
  if (props.episode.choice == null) {
    throw new Error('There is no archive')
  }
  const movieA = modelEpisodeMovie({ episodeItem: props.episode.choice.aEpisodeItem })
  const movieB = modelEpisodeMovie({ episodeItem: props.episode.choice.bEpisodeItem })
  const data = {
    aBetter: props.episode.choice.aBetter,
    aId: movieA.id,
    aItem: movieA,
    betterIndex: props.episode.choice.betterIndex,
    bId: movieB.id,
    bItem: movieB,
    random: props.episode.choice.random,
    seeded: props.episode.choice.seeded
  }
  return data
}
