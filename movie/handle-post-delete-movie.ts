import { NextResponse } from 'next/server'
import guardPostDeleteMovie from './guard-post-delete-movie'
import removeItem from '@/mergeChoice/removeItem'
import updateList from '@/list/update-list'

export default async function handlePostDeleteMovie (props: {
  request: Request
}): Promise<Response> {
  return await updateList({
    guard: guardPostDeleteMovie,
    guardLabel: '/movie/delete body',
    request: props.request,
    respond: () => NextResponse.json({ ok: true }),
    update: ({ body, state }) => {
      return removeItem({
        itemId: body.movieId,
        state
      })
    }
  })
}
