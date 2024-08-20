import { Db } from '@/prisma/prisma-types'
import { List } from '@prisma/client'
import { Session } from 'next-auth'
import { ApiError } from 'next/dist/server/api-utils'
import { CreateListRequest } from './list-types'
import createState from '@/mergechoice/createState'

export default async function handlePostList (props: {
  authSession: Session
  request: CreateListRequest
  db: Db
}): Promise<List> {
  const existing = await props.db.list.findFirst({
    where: {
      name: props.request.name,
      userId: props.authSession.user.id
    }
  })
  if (existing != null) {
    throw new ApiError(409, 'This list already exists')
  }
  const seed = String(Math.random())
  const state = createState({ seed })
  const { history, ...snapshot } = state
  const json = JSON.stringify(snapshot)
  const list = await props.db.list.create({
    data: {
      name: props.request.name,
      userId: props.authSession.user.id,
      seed: String(Math.random()),
      snapshot: json
    }
  })
  return list
}
