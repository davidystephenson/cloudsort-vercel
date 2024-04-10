import respondAuthError from '@/auth/respond-auth-error'
import serverAuth from '@/auth/server-auth'
import prisma from '@/prisma/prisma'
import { NextResponse } from 'next/server'
import importItems from '@/mergeChoice/importItems'
import saveStateToList from '@/list/save-state-to-list'
import guardUserMergechoiceList from '@/list/guard-user-mergechoice-list'
import guardPostImportMovies from '@/movie/guard-post-import-movies'

export async function POST (req: Request): Promise<Response> {
  const authSession = await serverAuth()
  if (authSession == null) {
    return respondAuthError()
  }
  const json = await req.json()
  const body = guardPostImportMovies({ data: json })
  await prisma.$transaction(async (tx) => {
    const mergeChoiceList = await guardUserMergechoiceList({
      listId: body.listId,
      userId: authSession.user.id
    })
    const newState = importItems({
      items: body.movies,
      state: mergeChoiceList.state
    })
    await saveStateToList({
      list: mergeChoiceList.list,
      state: newState,
      tx
    })
  }, {
    maxWait: 5000, // default: 200
    timeout: 1000000 // default: 5000
  })
  return NextResponse.json({ ok: true })
}
