import guardImportMoviesRequest from '@/movie/guard-import-movies-request'
import handleEvent from '@/event/handle-event'
import { EventResponse } from '@/event/event-types'
import createImportEvent from '@/event/create-import-event'

export async function POST (request: Request): EventResponse {
  const response = await handleEvent({
    guard: guardImportMoviesRequest,
    label: '/movie/import',
    createEvent: async (props) => {
      const event = await createImportEvent({
        events: props.events,
        listId: props.body.listId,
        movies: props.body.movies,
        tx: props.tx
      })
      return event
    },
    request
  })
  return response
}
