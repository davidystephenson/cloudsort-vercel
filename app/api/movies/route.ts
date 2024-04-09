import respondAuthError from '@/auth/respond-auth-error'
import serverAuth from '@/auth/server-auth'
import prisma from '@/prisma/prisma'
import { NextResponse } from 'next/server'
import importItems from '@/mergeChoice/importItems'
import saveStateToList from '@/list/save-state-to-list'
import guardPostMovies from '@/movie/guard-post-movies'
import guardUserMergechoiceList from '@/list/guard-user-mergechoice-list'
import { MovieData } from '@/movie/movie-types'

export async function POST (req: Request): Promise<Response> {
  const authSession = await serverAuth()
  if (authSession == null) {
    return respondAuthError()
  }
  const json = await req.json()
  const body = guardPostMovies({ data: json })
  const imdbIds = body.movies.map((movie) => movie.imdbId)
  console.log('begin exists')
  console.time('exists')
  const exists = await prisma.movie.findMany({
    where: {
      imdbId: {
        in: imdbIds
      }
    }
  })
  console.timeEnd('exists')
  const existsImdbIds = exists.map((movie) => movie.imdbId)
  const newMovieImdbIds = imdbIds.filter((imdbId) => !existsImdbIds.includes(imdbId))
  const newMovies = body
    .movies
    .filter((movie) => newMovieImdbIds.includes(movie.imdbId))
  console.log('begin getMergeChoiceList')
  console.time('getMergeChoiceList')
  const mergeChoiceList = await guardUserMergechoiceList({
    listId: body.listId,
    userId: authSession.user.id
  })
  console.timeEnd('getMergeChoiceList')
  const movies = await prisma.$transaction(async (tx) => {
    console.log('begin create newMovies')
    console.time('create newMovies')
    await tx.movie.createMany({
      data: newMovies
    })
    console.timeEnd('create newMovies')
    const currentItems = Object.values(mergeChoiceList.state.items)
    const newItems = body.movies.filter((movie) => {
      const exists = currentItems.some((item) => {
        return item.imdbId === movie.imdbId
      })
      return !exists
    })
    const newItemImdbIds = newItems.map((movie) => movie.imdbId)
    console.log('begin find newListMovies')
    console.time('find newListMovies')
    const newListMovies: MovieData[] = await tx.movie.findMany({
      where: {
        imdbId: {
          in: newItemImdbIds
        }
      }
    })
    console.timeEnd('find newListMovies')
    console.log('begin importItems')
    console.time('importItems')
    const newState = importItems({
      items: newListMovies,
      state: mergeChoiceList.state
    })
    console.timeEnd('importItems')
    console.log('begin saveStateToList')
    console.time('saveStateToList')
    await saveStateToList({
      list: mergeChoiceList.list,
      state: newState,
      tx
    })
    console.timeEnd('saveStateToList')
    console.log('end saveStateToList')
    return newListMovies
  }, {
    maxWait: 5000, // default: 200
    timeout: 1000000 // default: 5000
  })
  return NextResponse.json({ movies })
}
