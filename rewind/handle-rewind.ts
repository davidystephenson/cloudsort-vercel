import { episodeToHistoryEpisode } from '@/episode/episode-to-history-episode'
import guardRelatedList from '@/list/guard-related-list'
import rewindState from '@/mergechoice/rewindState'
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
  const list = await guardRelatedList({
    db: props.db,
    listId: props.listId
  })
  if (list == null) {
    throw new ApiError(404, 'This list does not exist')
  }
  const episode = list.episodes.find((episode) => {
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
  if (typeof list.snapshot !== 'string') {
    throw new Error('Snapshot is not a string')
  }
  const history = list.episodes.map(episode => {
    const historyEpisode = episodeToHistoryEpisode({ episode })
    return historyEpisode
  })
  const state = rewindState({
    episodeId: props.episodeMergechoiceId,
    history,
    seed: list.seed
  })
  const snapshot = { ...state, history: [] }
  const json = JSON.stringify(snapshot)
  await props.db.list.update({
    data: { snapshot: json },
    where: { id: props.listId }
  })
}
