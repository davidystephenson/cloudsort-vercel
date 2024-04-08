import respondAuthError from '@/auth/respond-auth-error'
import serverAuth from '@/auth/server-auth'
import prisma from '@/prisma/prisma'
import { NextResponse } from 'next/server'
import importItems from '@/mergeChoice/importItems'
import guardPostMovie from '@/movie/guard-post-movie'
import saveStateToList from '@/list/save-state-to-list'
import guardUserMergechoiceList from '@/list/guard-user-mergechoice-list'
import respondError from '@/respond/respond-error'
import handlePostDeleteMovie from '@/movie/handle-post-delete-movie'

export async function POST (req: Request): Promise<Response> {
  const authSession = await serverAuth()
  if (authSession == null) {
    return respondAuthError()
  }
  const json = await req.json()
  const body = guardPostMovie({ data: json })
  const { listId, ...movieData } = body
  const exists = await prisma.movie.findFirst({
    where: {
      imdbId: movieData.imdbId
    }
  })
  if (exists != null) {
    return respondError({ message: 'This movie already exists', status: 409 })
  }
  const mergeChoiceList = await guardUserMergechoiceList({ listId, userId: authSession.user.id })
  const movie = await prisma.$transaction(async (transaction) => {
    const movie = await transaction.movie.create({
      data: movieData
    })
    const newState = importItems({
      items: [movie],
      state: mergeChoiceList.state
    })
    await saveStateToList({
      list: mergeChoiceList.list,
      state: newState,
      tx: transaction
    })
    return movie
  })
  return NextResponse.json(movie)
}

export async function DELETE (request: Request): Promise<Response> {
  return await handlePostDeleteMovie({ request })
}
