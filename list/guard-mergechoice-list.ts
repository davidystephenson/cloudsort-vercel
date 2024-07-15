import { MergechoiceList } from './list-types'
import guardRelatedList from './guard-related-list'
import getMergechoiceList from './get-mergechoice-list'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { PrismaClient } from '@prisma/client'

export default async function guardMergechoiceList (props: {
  db: PrismaTransaction | PrismaClient
  listId: number
}): Promise<MergechoiceList> {
  const list = await guardRelatedList({
    db: props.db,
    listId: props.listId
  })
  const mergechoiceList = await getMergechoiceList({
    list
  })
  return mergechoiceList
}
