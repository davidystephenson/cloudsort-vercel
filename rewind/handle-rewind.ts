import guardListEpisodes from '@/episode/guard-list-episodes'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { PrismaClient } from '@prisma/client'
import { ApiError } from 'next/dist/server/api-utils'

export default async function handleRewind (props: {
  db: PrismaClient | PrismaTransaction
  episodeMergechoiceId: number
  lastMergechoiceId: number
  listId: number
  userId: number
}): Promise<void> {
  const episodes = await guardListEpisodes({
    db: props.db,
    lastMergechoiceId: props.lastMergechoiceId,
    listId: props.listId,
    userId: props.userId
  })
  const episode = episodes.find((episode) => {
    return episode.mergeChoiceId === props.episodeMergechoiceId
  })
  if (episode == null) {
    throw new ApiError(404, 'This episode does not exist')
  }
  await props.db.episode.deleteMany({
    where: {
      listId: props.listId,
      createdAt: {
        gte: episode.createdAt
      }
    }
  })
}
