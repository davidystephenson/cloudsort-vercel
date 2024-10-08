import { MovieWhere } from '@/movie/movie-types'
import { Db } from '@/prisma/prisma-types'
import { Session } from 'next-auth'

export default async function handleHideMovie (props: {
  request: MovieWhere
  db: Db
  authSession: Session
}): Promise<void> {
  const item = await props.db.movie.findUnique({
    where: {
      id: props.request.itemId
    }
  })
  if (item == null) {
    throw new Error('Not found')
  }
  await props.db.itemHide.create({
    data: {
      itemId: props.request.itemId,
      userId: props.authSession.user.id
    }
  })
}
