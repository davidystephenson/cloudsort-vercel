import { ApiError } from 'next/dist/server/api-utils'
import { MergechoiceList } from './list-types'
import guardRelatedList from './guard-related-list'
import getMergechoiceList from './get-mergechoice-list'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { PrismaClient } from '@prisma/client'

export default async function guardUserMergechoiceList (props: {
  db: PrismaTransaction | PrismaClient
  listId: number
  userId: number
}): Promise<MergechoiceList> {
  const list = await guardRelatedList({
    db: props.db,
    listId: props.listId
  })
  if (list.userId !== props.userId) {
    throw new ApiError(403, 'This is not your list')
  }
  const mergechoiceList = getMergechoiceList({
    list
  })
  return mergechoiceList
}
