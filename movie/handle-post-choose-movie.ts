import chooseOption from '@/mergeChoice/chooseOption'
import { NextResponse } from 'next/server'
import guardPostChooseMovie from './guard-post-choose-movie'
import updateList from '@/list/update-list'

export default async function handlePostChooseMovie (props: {
  request: Request
}): Promise<Response> {
  return await updateList({
    guard: guardPostChooseMovie,
    guardLabel: '/movie/choose body',
    request: props.request,
    respond: () => NextResponse.json({ ok: true }),
    update: ({ body, state }) => {
      return chooseOption({
        betterIndex: body.betterIndex,
        state
      })
    }
  })
}
