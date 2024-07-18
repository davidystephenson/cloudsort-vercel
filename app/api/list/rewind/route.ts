import guardListEpisodes from '@/episode/guard-list-episodes'
import { handleAuth } from '@/handle/handle-auth'
import { HandledResponse } from '@/handle/handle-types'
import { Ok } from '@/ok/ok-types'
import guardRewindRequest from '@/rewind/guard-rewind-request'
import { ApiError } from 'next/dist/server/api-utils'

export async function POST (request: Request): HandledResponse<Ok> {
  const response = await handleAuth({
    guard: guardRewindRequest,
    label: '/list/rewind',
    handle: async (authProps) => {
      const episodes = await guardListEpisodes({
        db: authProps.tx,
        lastMergechoiceId: authProps.body.lastMergechoiceId,
        listId: authProps.body.listId,
        userId: authProps.authSession.user.id
      })
      const episode = episodes.find((episode) => {
        return episode.mergeChoiceId === authProps.body.episodeMergechoiceId
      })
      if (episode == null) {
        throw new ApiError(404, 'This episode does not exist')
      }
      await authProps.tx.episode.deleteMany({
        where: {
          listId: authProps.body.listId,
          createdAt: {
            gte: episode.createdAt
          }
        }
      })
      return { ok: true }
    },
    request
  })
  return response
}
