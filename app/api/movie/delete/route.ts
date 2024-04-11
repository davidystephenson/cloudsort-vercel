import handleApiDeleteMovie from '@/movie/handle-post-delete-movie'

export async function POST (request: Request): Promise<Response> {
  return await handleApiDeleteMovie({ request })
}
