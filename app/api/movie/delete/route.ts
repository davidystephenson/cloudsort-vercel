import handlePostDeleteMovie from '@/movie/handle-post-delete-movie'

export async function POST (request: Request): Promise<Response> {
  return await handlePostDeleteMovie({ request })
}
