import handleEvent from '@/event/handle-event'
import importItems from '@/mergeChoice/importItems'
import guardPostImportMovies from '@/movie/guard-post-import-movies'

export async function POST (request: Request): Promise<Response> {
  const response = handleEvent({
    guard: guardPostImportMovies,
    label: '/movie/import',
    request,
    update: (props) => {
      return importItems({
        items: props.body.movies,
        state: props.state
      })
    }
  })
  return await response
}
