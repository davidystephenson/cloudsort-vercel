import { EPISODE_PARTS_RELATION } from '@/episode/episode-constants'
import { EpisodeResponse } from '@/episode/episode-types'
import handleEpisode from '@/episode/handle-episode'
import guardChooseMovieRequest from '@/movie/guard-choose-movie-request'
import { ApiError } from 'next/dist/server/api-utils'

export async function POST (request: Request): EpisodeResponse {
  const response = await handleEpisode({
    guard: guardChooseMovieRequest,
    label: '/movie/choose',
    createEpisode: async (props) => {
      if (typeof props.body.choice.aId !== 'number') {
        throw new ApiError(400, 'aId must be a number.')
      }
      if (typeof props.body.choice.bId !== 'number') {
        throw new ApiError(400, 'bId must be a number.')
      }
      const episode = await props.tx.episode.create({
        data: {
          choice: {
            create: {
              aBetter: props.body.choice.aBetter,
              aEpisodeItem: {
                create: {
                  itemId: props.body.choice.aId,
                  points: props.body.choice.aItem.points,
                  seed: props.body.choice.aItem.seed,
                  seeding: props.body.choice.aItem.seeding
                }
              },
              betterIndex: props.body.choice.betterIndex,
              bEpisodeItem: {
                create: {
                  itemId: props.body.choice.bId,
                  points: props.body.choice.bItem.points,
                  seed: props.body.choice.bItem.seed,
                  seeding: props.body.choice.bItem.seeding
                }
              },
              random: props.body.choice.random,
              seeded: props.body.choice.seeded
            }
          },
          listId: props.body.listId,
          mergeChoiceId: props.episodes.length
        },
        include: EPISODE_PARTS_RELATION
      })
      return episode
    },
    request
  })
  return response
}
