import { ApiError } from 'next/dist/server/api-utils'
import { List } from '@prisma/client'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { PostListBody } from './list-types'
import { Session } from 'next-auth'

export default async function handlePostList (props: {
  authSession: Session
  body: PostListBody
  tx: PrismaTransaction
}): Promise<List> {
  const existing = await props.tx.list.findFirst({
    where: {
      name: props.body.name,
      userId: props.authSession.user.id
    }
  })
  if (existing != null) {
    throw new ApiError(409, 'This list already exists')
  }
  const list = await props.tx.list.create({
    data: {
      name: props.body.name,
      userId: props.authSession.user.id,
      seed: String(Math.random())
    }
  })
  return list
}
