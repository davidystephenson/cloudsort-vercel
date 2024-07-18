import { EPISODE_PARTS_RELATION } from '@/episode/episode-constants'
import { RelatedEpisode } from '@/episode/episode-types'
import { EpisodeChoice } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { Db } from '@/prisma/prisma-types'
import { Episode } from '@prisma/client'
import { ApiError } from 'next/dist/server/api-utils'

export default async function createChoiceEpisode (props: {
  choice: EpisodeChoice<ListMovie>
  db: Db
  listId: number
  episodes: Episode[]
}): Promise<RelatedEpisode> {
  if (typeof props.choice.aId !== 'number') {
    throw new ApiError(400, 'aId must be a number.')
  }
  if (typeof props.choice.bId !== 'number') {
    throw new ApiError(400, 'bId must be a number.')
  }
  const episode = await props.db.episode.create({
    data: {
      choice: {
        create: {
          aBetter: props.choice.aBetter,
          aEpisodeItem: {
            create: {
              itemId: props.choice.aId,
              points: props.choice.aItem.points,
              seed: props.choice.aItem.seed,
              seeding: props.choice.aItem.seeding
            }
          },
          betterIndex: props.choice.betterIndex,
          bEpisodeItem: {
            create: {
              itemId: props.choice.bId,
              points: props.choice.bItem.points,
              seed: props.choice.bItem.seed,
              seeding: props.choice.bItem.seeding
            }
          },
          random: props.choice.random,
          seeded: props.choice.seeded
        }
      },
      listId: props.listId,
      mergeChoiceId: props.episodes.length
    },
    include: EPISODE_PARTS_RELATION
  })
  return episode
}
