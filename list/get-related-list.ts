import { RelatedList } from './list-types'
import { EPISODE_RELATION } from '@/event/event-constants'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { PrismaClient } from '@prisma/client'

export default async function getRelatedList (props: {
  db: PrismaTransaction | PrismaClient
  listId: number
}): Promise<RelatedList | null> {
  const list = await props.db.list.findFirst({
    where: {
      id: props.listId
    },
    include: {
      episodes: {
        ...EPISODE_RELATION,
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })
  return list
}
