import { MovieWhere } from '@/movie/movie-types'
import { Db } from '@/prisma/prisma-types'
import { Session } from 'next-auth'

export default async function handleUnhideMovie (props: {
  body: MovieWhere
  db: Db
  authSession: Session
}): Promise<void> {
  const itemHide = await props.db.itemHide.findFirst({
    where: {
      itemId: props.body.itemId,
      userId: props.authSession.user.id
    }
  })
  if (itemHide == null) {
    throw new Error('Not found')
  }
  await props.db.itemHide.delete({
    where: {
      id: itemHide.id
    }
  })
}
