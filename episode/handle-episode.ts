import { Guard } from '@/fashion-police/fashionPoliceTypes'
import { handleAuth } from '@/handle/handle-auth'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { Episode, PrismaClient } from '@prisma/client'
import { LastWhere } from '../list/list-types'
import { EpisodeResponse, RelatedEpisode } from './episode-types'
import guardListEpisodes from './guard-list-episodes'
import { episodeToHistoryEpisode } from './episode-to-history-episode'
import createListState from '@/list/create-list-state'
import { Episode as HistoryEpisode, State } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export default async function handleEpisode<RequestBody extends LastWhere> (props: {
  guard: Guard<RequestBody>
  label: string
  create: (props: {
    body: RequestBody
    episodes: Episode[]
    db: PrismaTransaction | PrismaClient
  }) => Promise<RelatedEpisode>
  request: Request
  snap: (props: {
    episode: RelatedEpisode
    historyEpisode: HistoryEpisode<ListMovie>
    request: RequestBody
    state: State<ListMovie>
  }) => State<ListMovie>
}): EpisodeResponse {
  const response = await handleAuth({
    guard: props.guard,
    label: props.label,
    handle: async (authProps) => {
      const episodes = await guardListEpisodes({
        db: authProps.db,
        lastMergechoiceId: authProps.request.lastMergechoiceId,
        listId: authProps.request.listId,
        userId: authProps.authSession.user.id
      })
      const episode = await props.create({
        body: authProps.request,
        episodes,
        db: authProps.db
      })
      console.log('handleEpisode episode.import.episodeItems', episode.import?.episodeItems)
      const historyEpisode = episodeToHistoryEpisode({ episode })
      console.log('historyEpisode.import.items initial', historyEpisode.import?.items)
      const listState = await createListState({
        db: authProps.db,
        listId: authProps.request.listId
      })
      const state = { ...listState, history: [] }
      const historyEpisodeClone = structuredClone(historyEpisode)
      const newState = props.snap({
        episode,
        historyEpisode: historyEpisodeClone,
        request: authProps.request,
        state
      })
      const snapshot = { ...newState, history: [] }
      const json = JSON.stringify(snapshot)
      await authProps.db.list.update({
        data: { snapshot: json },
        where: { id: authProps.request.listId }
      })
      console.log('historyEpisode.import.items response', historyEpisode.import?.items)
      return { ok: true, episode: historyEpisode }
    },
    request: props.request
  })
  return response
}
