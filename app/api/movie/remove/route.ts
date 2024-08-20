import { EPISODE_PARTS_RELATION } from '@/episode/episode-constants'
import { EpisodeResponse } from '@/episode/episode-types'
import handleEpisode from '@/episode/handle-episode'
import removeItem from '@/mergechoice/removeItem'
import guardRemoveMovieRequest from '@/movie/guard-remove-movie-request'

export async function POST (request: Request): EpisodeResponse {
  const response = await handleEpisode({
    create: async (props) => {
      const episode = await props.db.episode.create({
        data: {
          remove: {
            create: {
              episodeItem: {
                create: {
                  itemId: props.body.remove.item.id,
                  points: props.body.remove.item.points,
                  seed: props.body.remove.item.seed,
                  seeding: props.body.remove.item.seeding
                }
              }
            }
          },
          listId: props.body.listId,
          mergeChoiceId: props.episodes.length
        },
        include: EPISODE_PARTS_RELATION
      })
      return episode
    },
    guard: guardRemoveMovieRequest,
    label: '/movie/remove',
    request,
    snap: (props) => {
      const newState = removeItem({
        itemId: props.request.remove.item.id,
        state: props.state
      })
      return newState
    }
  })
  return response
}
