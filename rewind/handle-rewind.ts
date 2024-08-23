import guardRelatedList from '@/list/guard-related-list'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { RewindRequest } from '@/shade/rewind-types'
import { PrismaClient } from '@prisma/client'
import { ApiError } from 'next/dist/server/api-utils'

export default async function handleRewind (props: {
  request: RewindRequest
  db: PrismaTransaction | PrismaClient
}): Promise<void> {
  const list = await guardRelatedList({
    db: props.db,
    listId: props.request.listId
  })
  if (list == null) {
    throw new ApiError(404, 'This list does not exist')
  }
  const episode = list.episodes.find((episode) => {
    return episode.mergeChoiceId === props.request.episodeMergechoiceId
  })
  if (episode == null) {
    throw new ApiError(404, 'This episode does not exist')
  }
  await props.db.episode.deleteMany({
    where: {
      listId: props.request.listId,
      createdAt: {
        gte: episode.createdAt
      }
    }
  })
  await props.db.list.update({
    data: { snapshot: props.request.snapshot },
    where: { id: props.request.listId }
  })
}
