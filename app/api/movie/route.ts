import respondAuthError from '@/auth/respond-auth-error'
import serverAuth from '@/auth/server-auth'
import apiError from '@/api/api-error'
import prisma from '@/prisma/prisma'
import { DeleteMovieBody } from '@/movie/movie-types'
import { NextResponse } from 'next/server'
import importItems from '@/mergeChoice/importItems'
import getMergeChoiceList from '@/list/get-merge-choice-list'
import guardPostMovie from '@/movie/guard-post-movie'
import saveStateToList from '@/list/save-state-to-list'

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
    return apiError({ message: 'This movie already exists', status: 409 })
  }
  const mergeChoiceList = await getMergeChoiceList({ listId, userId: authSession.user.id })
  const movie = await prisma.$transaction(async (transaction) => {
    const movie = await transaction.movie.create({
      data: movieData
    })
    const newState = await importItems({
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

export async function DELETE (req: Request): Promise<Response> {
  const authSession = await serverAuth()
  if (authSession == null) {
    return respondAuthError()
  }
  const body: DeleteMovieBody = await req.json()
  const movie = await prisma.movie.findFirst({
    where: {
      id: body.movieId
    }
  })
  if (movie == null) {
    return apiError({ message: 'This movie does not exist', status: 404 })
  }
  const list = await prisma.list.findFirst({
    where: {
      id: body.listId
    }
  })
  if (list == null) {
    return apiError({ message: 'This list does not exist', status: 404 })
  }
  if (list.userId !== authSession.user.id) {
    return apiError({ message: 'This is not your list', status: 403 })
  }
  return NextResponse.json(movie)
}
