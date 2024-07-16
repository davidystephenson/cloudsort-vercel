import { ListWhere } from '../list/list-types'
import { Episode } from '@prisma/client'
import { Guard } from '@/fashion-police/fashionPoliceTypes'
import { ApiError } from 'next/dist/server/api-utils'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { handleAuth } from '@/handle/handle-auth'
import { episodeToHistoryEpisode } from '@/list/get-mergechoice-list'
import { EpisodeResponse, RelatedEpisode } from './episode-types'

export default async function handleEpisode<Body extends ListWhere> (props: {
  guard: Guard<Body>
  label: string
  createEpisode: (props: {
    body: Body
    episodes: Episode[]
    tx: PrismaTransaction
  }) => Promise<RelatedEpisode>
  request: Request
}): EpisodeResponse {
  const response = await handleAuth({
    guard: props.guard,
    label: props.label,
    handle: async (authProps) => {
      const list = await authProps.tx.list.findUnique({
        where: { id: authProps.body.listId }
      })
      if (list == null) {
        throw new ApiError(404, 'List not found.')
      }
      if (authProps.authSession.user.id !== list.userId) {
        throw new ApiError(403, 'Not authorized.')
      }
      const episodes = await authProps.tx.episode.findMany({
        where: { listId: authProps.body.listId }
      })
      const sortedEpisodes = episodes.sort((a, b) => {
        if (a.createdAt < b.createdAt) return -1
        if (a.createdAt > b.createdAt) return 1
        return 0
      })
      const lastEpisode = sortedEpisodes[sortedEpisodes.length - 1]
      if (lastEpisode != null) {
        const episodeWrong = lastEpisode.mergeChoiceId !== authProps.body.lastMergechoiceId
        if (episodeWrong) {
          throw new ApiError(400, 'That is not the last episode.')
        }
      }
      const episode = await props.createEpisode({
        body: authProps.body,
        episodes,
        tx: authProps.tx
      })
      const historyEpisode = episodeToHistoryEpisode({ episode })
      return { ok: true, episode: historyEpisode }
    },
    request: props.request
  })
  return response
}
