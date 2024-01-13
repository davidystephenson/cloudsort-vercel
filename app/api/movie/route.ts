import respondAuthError from '@/lib/auth/respond-auth-error'
import serverAuth from '@/lib/auth/server-auth'
import apiError from '@/lib/api/api-error'
import prisma from '@/lib/prisma/prisma'
import { DeleteMovieBody } from '@/lib/movie/movie-types'
import { NextResponse } from 'next/server'
import importItems from '@/lib/mergeChoice/importItems'
import getMergeChoiceList from '@/lib/list/get-merge-choice-list'
import guardPostMovie from '@/lib/movie/guard-post-movie'
import saveStateToList from '@/lib/list/save-state-to-list'

export async function POST (req: Request): Promise<Response> {
  const authSession = await serverAuth()
  if (authSession == null) {
    return respondAuthError()
  }
  const json = await req.json()
  const body = guardPostMovie({ data: json })
  const exists = await prisma.movie.findFirst({
    where: {
      imdbId: body.imdbId
    }
  })
  if (exists != null) {
    return apiError({ message: 'This movie already exists', status: 409 })
  }
  const { listId, ...movieData } = body
  const mergeChoiceList = await getMergeChoiceList({ listId: body.listId, userId: authSession.user.id })
  const movie = await prisma.$transaction(async (transaction) => {
    const movie = await transaction.movie.create({
      data: movieData
    })

    const newState = await importItems({
      items: [movie],
      state: mergeChoiceList.state
    })
    console.log('newState.choice', newState.choice)
    await saveStateToList({
      list: mergeChoiceList.list,
      state: newState,
      transaction
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
  // const itemIds = list.itemIds.filter((id) => id !== movie.id)
  // await prisma.list.update({
  //   where: {
  //     id: body.listId
  //   },
  //   data: {
  //     itemIds
  //   }
  // })
  return NextResponse.json(movie)
}