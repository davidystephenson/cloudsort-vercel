import { Guard } from '@/fashion-police/fashionPoliceTypes'
import { handleAuth } from '@/handle/handle-auth'
import { episodeToHistoryEpisode } from '@/list/get-mergechoice-list'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { Episode, PrismaClient } from '@prisma/client'
import { LastWhere } from '../list/list-types'
import { EpisodeResponse, RelatedEpisode } from './episode-types'
import guardListEpisodes from './guard-list-episodes'

export default async function handleEpisode<Body extends LastWhere> (props: {
  guard: Guard<Body>
  label: string
  create: (props: {
    body: Body
    episodes: Episode[]
    db: PrismaTransaction | PrismaClient
  }) => Promise<RelatedEpisode>
  request: Request
}): EpisodeResponse {
  const response = await handleAuth({
    guard: props.guard,
    label: props.label,
    handle: async (authProps) => {
      const episodes = await guardListEpisodes({
        db: authProps.db,
        lastMergechoiceId: authProps.body.lastMergechoiceId,
        listId: authProps.body.listId,
        userId: authProps.authSession.user.id
      })
      const episode = await props.create({
        body: authProps.body,
        episodes,
        db: authProps.db
      })
      const historyEpisode = episodeToHistoryEpisode({ episode })
      return { ok: true, episode: historyEpisode }
    },
    request: props.request
  })
  return response
}
