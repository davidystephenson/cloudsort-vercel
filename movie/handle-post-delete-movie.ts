import { NextResponse } from 'next/server'
import updateList from '@/list/update-list'
import guardPostDeleteMovie from './guard-post-delete-movie'
import removeItem from '@/mergeChoice/removeItem'

export default async function handlePostDeleteMovie (props: {
  request: Request
}): Promise<Response> {
  return await updateList({
    guard: guardPostDeleteMovie,
    request: props.request,
    respond: () => NextResponse.json({ ok: true }),
    update: ({ body, state }) => {
      return removeItem({
        id: body.movieId,
        state
      })
    }
  })
}
