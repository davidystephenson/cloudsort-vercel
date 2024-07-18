import { CalculatedMovie } from '@/movie/movie-types'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { RelatedEpisode } from '../episode/episode-types'
import { EPISODE_PARTS_RELATION } from '../episode/episode-constants'
import { Episode } from '@prisma/client'

export default async function createImportEpisode (props: {
  episodes: Episode[]
  listId: number
  movies: CalculatedMovie[]
  tx: PrismaTransaction
}): Promise<RelatedEpisode> {
  const episodeItems = props.movies.map((movie) => {
    const episodeItem = {
      itemId: movie.id,
      points: movie.points,
      seed: movie.seed,
      seeding: movie.seeding
    }
    return episodeItem
  })
  const episode = await props.tx.episode.create({
    data: {
      import: {
        create: {
          episodeItems: {
            create: episodeItems
          }
        }
      },
      listId: props.listId,
      mergeChoiceId: props.episodes.length
    },
    include: EPISODE_PARTS_RELATION
  })
  return episode
}
