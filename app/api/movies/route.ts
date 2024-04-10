import respondAuthError from '@/auth/respond-auth-error'
import serverAuth from '@/auth/server-auth'
import prisma from '@/prisma/prisma'
import { NextResponse } from 'next/server'
import guardPostMovies from '@/movie/guard-post-movies'

export async function POST (req: Request): Promise<Response> {
  const authSession = await serverAuth()
  if (authSession == null) {
    return respondAuthError()
  }
  const json = await req.json()
  const body = guardPostMovies({ data: json })
  const movies = await prisma.$transaction(async (tx) => {
    const imdbIds = body.movies.map((movie) => movie.imdbId)
    const existingMovies = await tx.movie.findMany({
      where: {
        imdbId: {
          in: imdbIds
        }
      }
    })
    const existingImdbIds = existingMovies.map((movie) => movie.imdbId)
    const newImdbIds = imdbIds.filter((imdbId) => !existingImdbIds.includes(imdbId))
    const newMovieData = body
      .movies
      .filter((movie) => newImdbIds.includes(movie.imdbId))
    await prisma.movie.createMany({
      data: newMovieData
    })
    const newMovies = await tx.movie.findMany({
      where: {
        imdbId: {
          in: newImdbIds
        }
      }
    })
    const movies = [...existingMovies, ...newMovies]
    return movies
  }, {
    maxWait: 5000, // default: 200
    timeout: 1000000 // default: 5000
  })
  return NextResponse.json({ movies })
}
