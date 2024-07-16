import handleEpisode from '@/episode/handle-episode'
import guardPostMovies from '@/movie/guard-post-movies'
import handlePostMovies from '@/movie/handle-post-movies'

export async function POST (request: Request): Promise<Response> {
  const response = await handleEpisode({
    guard: guardPostMovies,
    label: '/movies',
    createEpisode: async (props) => {
      const episode = await handlePostMovies({
        episodes: props.episodes,
        listId: props.body.listId,
        movies: props.body.movies,
        tx: props.tx
      })
      return episode
    },
    request
  })
  return response
}
