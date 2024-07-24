'use server'

import { MergechoiceList } from './list-types'
import guardRelatedList from './guard-related-list'
import getMergechoiceList from './get-mergechoice-list'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { PrismaClient } from '@prisma/client'
import { ApiError } from 'next/dist/server/api-utils'

export default async function guardMergechoiceList (props: {
  db: PrismaTransaction | PrismaClient
  listId: number
  currentUserId?: number
}): Promise<MergechoiceList> {
  const list = await guardRelatedList({
    db: props.db,
    listId: props.listId
  })
  if (list.hidden && list.userId !== props.currentUserId) {
    throw new ApiError(404, 'There is no list')
  }
  const mergechoiceList = getMergechoiceList({
    list
  })
  return mergechoiceList
}
