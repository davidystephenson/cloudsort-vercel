import prisma from '@/prisma/prisma'
import { RelatedList } from './list-types'
import { EVENT_RELATION } from '@/event/event-constants'

export default async function getRelatedList (props: {
  listId: number
}): Promise<RelatedList | null> {
  const list = await prisma.list.findFirst({
    where: {
      id: props.listId
    },
    include: {
      events: EVENT_RELATION
    }
  })
  return list
}
