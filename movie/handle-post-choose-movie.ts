import chooseOption from '@/mergeChoice/chooseOption'
import { NextResponse } from 'next/server'
import guardChooseMovie from './guard-choose-movie'
import handleUpdateList from '@/list/update-list'

export default async function handlePostChooseMovie (props: {
  request: Request
}): Promise<Response> {
  return await handleUpdateList({
    guard: guardChooseMovie,
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
