import { Db } from '@/prisma/prisma-types'
import { List } from '@prisma/client'
import { Session } from 'next-auth'
import { ApiError } from 'next/dist/server/api-utils'
import { CreateListRequest } from './list-types'

export default async function handlePostList (props: {
  authSession: Session
  body: CreateListRequest
  db: Db
}): Promise<List> {
  const existing = await props.db.list.findFirst({
    where: {
      name: props.body.name,
      userId: props.authSession.user.id
    }
  })
  if (existing != null) {
    throw new ApiError(409, 'This list already exists')
  }
  const list = await props.db.list.create({
    data: {
      name: props.body.name,
      userId: props.authSession.user.id,
      seed: String(Math.random())
    }
  })
  return list
}
