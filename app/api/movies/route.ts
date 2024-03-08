import respondAuthError from '@/auth/respond-auth-error'
import serverAuth from '@/auth/server-auth'
import prisma from '@/prisma/prisma'
import { NextResponse } from 'next/server'
import importItems from '@/mergeChoice/importItems'
import getMergeChoiceList from '@/list/get-merge-choice-list'
import saveStateToList from '@/list/save-state-to-list'
import guardPostMovies from '@/movie/guard-post-movies'

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
  const existsImdbIds = exists.map((movie) => movie.imdbId)
  const newMovieImdbIds = imdbIds.filter((imdbId) => !existsImdbIds.includes(imdbId))
  const newMovies = body
    .movies
    .filter((movie) => newMovieImdbIds.includes(movie.imdbId))
  const mergeChoiceList = await getMergeChoiceList({
    listId: body.listId,
    userId: authSession.user.id
  })
  const movies = await prisma.$transaction(async (tx) => {
    await tx.movie.createMany({
      data: newMovies
    })
    const currentItems = Object.values(mergeChoiceList.state.items)
    const newItems = body.movies.filter((movie) => {
      const exists = currentItems.some((item) => {
        return item.imdbId === movie.imdbId
      })
      return !exists
    })
    const newItemImdbIds = newItems.map((movie) => movie.imdbId)
    const newListMovies = await tx.movie.findMany({
      where: {
        imdbId: {
          in: newItemImdbIds
        }
      }
    })
    const newState = importItems({
      items: newListMovies,
      state: mergeChoiceList.state
    })
    await saveStateToList({
      list: mergeChoiceList.list,
      state: newState,
      tx
    })
    return newListMovies
  })
  return NextResponse.json({ movies })
}
