import respondAuthError from '@/lib/auth/respond-auth-error'
import serverAuth from '@/lib/auth/server-auth'
import apiError from '@/lib/api/api-error'
import prisma from '@/lib/prisma/prisma'
import { PostMovieBody } from '@/lib/movie/movie-types'
import { NextResponse } from 'next/server'

export async function POST (req: Request): Promise<Response> {
  const authSession = await serverAuth()
  if (authSession == null) {
    return respondAuthError()
  }
  const body: PostMovieBody = await req.json()
  const { listId, ...movieData } = body
  const list = await prisma.list.findFirst({
    where: {
      id: listId
    }
  })
  if (list == null) {
    return apiError({ message: 'This list does not exist', status: 404 })
  }
  if (list.userId !== authSession.user.id) {
    return apiError({ message: 'This is not your list', status: 403 })
  }
  const exists = await prisma.movie.findFirst({
    where: {
      imdbId: body.imdbId
    }
  })
  if (exists != null) {
    return apiError({ message: 'This movie already exists', status: 409 })
  }
  const movie = await prisma.$transaction(async (transaction) => {
    const movie = await transaction.movie.create({
      data: movieData
    })
    await transaction.list.update({
      where: {
        id: listId
      },
      data: {
        itemIds: {
          push: movie.id
        }
      }
    })
    return movie
  })
  console.log('movie', movie)
  return NextResponse.json(movie)
}
