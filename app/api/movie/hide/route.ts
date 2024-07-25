import { handleAuth } from '@/handle/handle-auth'
import { OkTrueResponse } from '@/handle/handle-types'
import policeMovieWhere from '@/movie/police-movie-where'

export async function POST (request: Request): OkTrueResponse {
  const response = await handleAuth({
    guard: policeMovieWhere,
    label: '/movie/hide',
    handle: async (props) => {
      if (props.authSession == null) {
        throw new Error('Unauthorized')
      }
      const item = await props.db.movie.findUnique({
        where: {
          id: props.body.itemId
        }
      })
      if (item == null) {
        throw new Error('Not found')
      }
      await props.db.itemHide.create({
        data: {
          itemId: props.body.itemId,
          userId: props.authSession.user.id
        }
      })
    },
    request
  })
  return response
}
