import { ApiError } from 'next/dist/server/api-utils'
import getRelatedList from './get-related-list'
import { RelatedList } from './list-types'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { PrismaClient } from '@prisma/client'

export default async function guardRelatedList (props: {
  db: PrismaTransaction | PrismaClient
  listId: number
}): Promise<RelatedList> {
  const list = await getRelatedList({
    db: props.db,
    listId: props.listId
  })
  if (list == null) {
    throw new ApiError(404, 'There is no list')
  }
  return list
}
