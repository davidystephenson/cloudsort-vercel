import respondAuthError from '@/auth/respond-auth-error'
import serverAuth from '@/auth/server-auth'
import prisma from '@/prisma/prisma'
import { NextResponse } from 'next/server'
import importItems from '@/mergeChoice/importItems'
import guardPostMovie from '@/movie/guard-post-movie'
import saveStateToList from '@/list/save-state-to-list'
import guardUserMergechoiceList from '@/list/guard-user-mergechoice-list'

export async function POST (req: Request): Promise<Response> {
  const authSession = await serverAuth()
  if (authSession == null) {
    return respondAuthError()
  }
  const json = await req.json()
  const body = guardPostMovie({ data: json })
  const { listId, ...movieData } = body
  await prisma.$transaction(async (transaction) => {
    const mergeChoiceList = await guardUserMergechoiceList({ listId, userId: authSession.user.id })
    const newState = importItems({
      items: [movieData],
      state: mergeChoiceList.state
    })
    await saveStateToList({
      list: mergeChoiceList.list,
      state: newState,
      tx: transaction
    })
  })
  return NextResponse.json({ ok: true })
}
