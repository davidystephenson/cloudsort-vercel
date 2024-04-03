import handlePostChooseMovie from '@/movie/handle-post-choose-movie'

export async function POST (request: Request): Promise<Response> {
  return await handlePostChooseMovie({ request })
}
