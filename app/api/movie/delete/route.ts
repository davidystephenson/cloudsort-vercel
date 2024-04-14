import updateList from '@/list/update-list'
import removeItem from '@/mergeChoice/removeItem'
import guardPostDeleteMovie from '@/movie/guard-post-delete-movie'

export async function POST (request: Request): Promise<Response> {
  return await updateList({
    guardBody: guardPostDeleteMovie,
    guardLabel: '/movie/delete body',
    request,
    update: (props) => {
      return removeItem({
        itemId: props.body.movieId,
        state: props.state
      })
    }
  })
}
