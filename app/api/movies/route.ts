import guardPostMovies from '@/movie/guard-post-movies'
import handlePostMovies from '@/movie/handle-post-movies'
import handleEvent from '@/event/handle-event'

export async function POST (request: Request): Promise<Response> {
  const response = await handleEvent({
    guard: guardPostMovies,
    label: '/movies',
    createEvent: async (props) => {
      const event = handlePostMovies({
        events: props.events,
        listId: props.body.listId,
        movies: props.body.movies,
        tx: props.tx
      })
      return await event
    },
    request
  })
  return response
}
