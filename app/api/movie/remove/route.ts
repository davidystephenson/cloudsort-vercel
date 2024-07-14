import { EVENT_PARTS_RELATION } from '@/event/event-constants'
import { EventResponse } from '@/event/event-types'
import handleEvent from '@/event/handle-event'
import guardRemoveMovieRequest from '@/movie/guard-remove-movie-request'

export async function POST (request: Request): EventResponse {
  const response = await handleEvent({
    guard: guardRemoveMovieRequest,
    label: '/movie/remove',
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
        include: EVENT_PARTS_RELATION
      })
      return event
    },
    request
  })
  return response
}
