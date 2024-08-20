import { PrismaTransaction } from '@/prisma/prisma-types'
import { PrismaClient } from '@prisma/client'
import { ApiError } from 'next/dist/server/api-utils'
import { RelatedEpisode } from './episode-types'
import { EPISODE_RELATION } from './episode-constants'

export default async function guardListEpisodes (props: {
  db: PrismaTransaction | PrismaClient
  lastMergechoiceId: number | null
  listId: number
  userId: number
}): Promise<RelatedEpisode[]> {
  const list = await props.db.list.findUnique({
    where: { id: props.listId }
  })
  if (list == null) {
    throw new ApiError(404, 'List not found.')
  }
  if (props.userId !== list.userId) {
    throw new ApiError(403, 'Not authorized.')
  }
  const episodes = await props.db.episode.findMany({
    where: { listId: props.listId },
    ...EPISODE_RELATION
  })
  const sortedEpisodes = episodes.sort((a, b) => {
    if (a.createdAt < b.createdAt) return -1
    if (a.createdAt > b.createdAt) return 1
    return 0
  })
  const lastEpisode = sortedEpisodes[sortedEpisodes.length - 1]
  if (lastEpisode != null) {
    const episodeWrong = lastEpisode.mergeChoiceId !== props.lastMergechoiceId
    if (episodeWrong) {
      throw new ApiError(400, 'That is not the last episode.')
    }
  }
  return episodes
}
