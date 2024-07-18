import { handleAuth } from '@/handle/handle-auth'
import { HandledResponse } from '@/handle/handle-types'
import { Ok } from '@/ok/ok-types'
import guardRewindRequest from '@/rewind/guard-rewind-request'
import handleRewind from '@/rewind/handle-rewind'

export async function POST (request: Request): HandledResponse<Ok> {
  const response = await handleAuth({
    guard: guardRewindRequest,
    label: '/list/rewind',
    handle: async (authProps) => {
      await handleRewind({
        db: authProps.tx,
        episodeMergechoiceId: authProps.body.episodeMergechoiceId,
        lastMergechoiceId: authProps.body.lastMergechoiceId,
        listId: authProps.body.listId,
        userId: authProps.authSession.user.id
      })
      return { ok: true }
    },
    request
  })
  return response
}
