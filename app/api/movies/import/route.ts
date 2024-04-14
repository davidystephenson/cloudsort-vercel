import importItems from '@/mergeChoice/importItems'
import guardPostImportMovies from '@/movie/guard-post-import-movies'
import updateList from '@/list/update-list'

export async function POST (request: Request): Promise<Response> {
  return await updateList({
    guardBody: guardPostImportMovies,
    guardLabel: '/movie/delete body',
    request,
    update: (props) => {
      return importItems({
        items: props.body.movies,
        state: props.state
      })
    }
  })
}
