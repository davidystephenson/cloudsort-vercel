import { handleAuth } from '@/handle/handle-auth'
import guardPostMovies from '@/movie/guard-post-movies'
import handlePostMovies from '@/movie/handle-post-movies'

import { REMOVE_RELATION } from '@/event/event-constants'
import handleEvent from '@/event/handle-event'

export async function POST (request: Request): Promise<Response> {
  const response = await handleEvent({
    guard: guardPostMovies,
    label: '/movie/choose',
    createEvent: async (props) => {
      const event = await props.tx.event.create({
        data: {
          remove: {
            create: {
              eventItem: {
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
          mergeChoiceId: props.events.length
        },
        include: REMOVE_RELATION
      })
      return event
    },
    request
  })
  return response
}

export async function POST (request: Request): Promise<Response> {
  return await handleAuth({
    guard: guardPostMovies,
    label: '/api/movies body',
    handle: handlePostMovies,
    request
  })
}
