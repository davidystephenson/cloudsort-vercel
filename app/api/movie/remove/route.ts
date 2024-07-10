import { REMOVE_RELATION } from '@/event/event-constants'
import handleEvent from '@/event/handle-event'
import guardRemoveMovieRequest from '@/movie/gaurd-remove-movie-request'

export async function POST (request: Request): Promise<Response> {
  // return handleEvent({
  //   guard: guardPostDeleteMovie,
  //   label: '/movie/delete body',
  //   request,
  //   update: (props) => {
  //     return removeItem({
  //       itemId: props.body.movieId,
  //       state: props.state
  //     })
  //   }
  // })
  const response = await handleEvent({
    guard: guardRemoveMovieRequest,
    label: '/movie/choose',
    createEvent: async (eventProps) => {
      const event = await eventProps.tx.event.create({
        data: {
          remove: {
            create: {
              eventItem: {
                create: {
                  itemId: eventProps.body.remove.item.id,
                  points: eventProps.body.remove.item.points,
                  seed: eventProps.body.remove.item.seed,
                  seeding: eventProps.body.remove.item.seeding
                }
              }
            }
          },
          listId: eventProps.body.listId,
          mergeChoiceId: eventProps.events.length
        },
        include: REMOVE_RELATION
      })
      return event
    },
    request
  })
  return response
}
