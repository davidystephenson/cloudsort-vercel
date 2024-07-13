import guardImportMoviesRequest from '@/movie/guard-import-movies-request'
import { EVENT_PARTS_RELATION } from '@/event/event-constants'
import handleEvent from '@/event/handle-event'
import { EventResponse } from '@/event/event-types'

export async function POST (request: Request): EventResponse {
  const response = await handleEvent({
    guard: guardImportMoviesRequest,
    label: '/movie/choose',
    createEvent: async (props) => {
      const createdEventItems = props.body.movies.map((movie) => {
        const eventItem = {
          itemId: movie.id,
          points: movie.points,
          seed: movie.seed,
          seeding: movie.seeding
        }
        return eventItem
      })
      const event = await props.tx.event.create({
        data: {
          import: {
            create: {
              eventItems: {
                create: createdEventItems
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
