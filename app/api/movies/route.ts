import respondAuthError from '@/lib/auth/respond-auth-error'
import serverAuth from '@/lib/auth/server-auth'
import apiError from '@/lib/api/api-error'
import prisma from '@/lib/prisma/prisma'
import { NextResponse } from 'next/server'
import importItems from '@/lib/mergeChoice/importItems'
import getMergeChoiceList from '@/lib/list/get-merge-choice-list'
import saveStateToList from '@/lib/list/save-state-to-list'
import guardPostMovies from '@/lib/movie/guard-post-movies'

export async function POST (req: Request): Promise<Response> {
  const authSession = await serverAuth()
  if (authSession == null) {
    return respondAuthError()
  }
  const json = await req.json()
  const body = guardPostMovies({ data: json })
  const imdbIds = body.movies.map((movie) => movie.imdbId)
  const exists = await prisma.movie.findMany({
    where: {
      imdbId: {
        in: imdbIds
      }
    }
  })
  if (exists.length === 1) {
    const movie = exists[0]
    const message = `${movie.imdbId} already exists`
    return apiError({ message, status: 409 })
  }
  if (exists.length > 1) {
    const imdbIds = exists.map((movie) => movie.imdbId).join(', ')
    const message = `${imdbIds} already exist`
    return apiError({ message, status: 409 })
  }
  const mergeChoiceList = await getMergeChoiceList({ listId: body.listId, userId: authSession.user.id })
  await prisma.movie.createMany({
    data: body.movies
  })
  const movies = await prisma.movie.findMany({
    where: {
      imdbId: {
        in: imdbIds
      }
    }
  })
  const newState = await importItems({
    items: movies,
    state: mergeChoiceList.state
  })
  await saveStateToList({
    list: mergeChoiceList.list,
    state: newState
  })
  return NextResponse.json({ movies })
}
