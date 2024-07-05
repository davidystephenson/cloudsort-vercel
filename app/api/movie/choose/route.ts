import { CHOICE_RELATION } from '@/event/event-constants'
import guardPostChooseMovie from '@/movie/guard-post-choose-movie'
import { handleAuthPost } from '@/post/handle-auth-post'
import { ApiError } from 'next/dist/server/api-utils'

export async function POST (request: Request): Promise<Response> {
  return await handleAuthPost({
    guard: guardPostChooseMovie,
    guardLabel: '/movie/choose body',
    handle: async (props) => {
      const list = await props.tx.list.findUnique({
        where: { id: props.body.listId }
      })
      if (list == null) {
        throw new ApiError(404, 'List not found.')
      }
      if (props.authSession.user.id !== list.userId) {
        throw new ApiError(403, 'Not authorized.')
      }
      const events = await props.tx.event.findMany({
        where: { listId: props.body.listId }
      })
      const sortedEvents = events.sort((a, b) => {
        if (a.createdAt < b.createdAt) return -1
        if (a.createdAt > b.createdAt) return 1
        return 0
      })
      const lastEvent = sortedEvents[sortedEvents.length - 1]
      if (lastEvent != null && lastEvent.mergeChoiceId === props.body.lastChoiceMergechoiceId) {
        throw new ApiError(400, 'That is not the last event.')
      }
      if (typeof props.body.choice.aId !== 'number') {
        throw new ApiError(400, 'aId must be a number.')
      }
      if (typeof props.body.choice.bId !== 'number') {
        throw new ApiError(400, 'bId must be a number.')
      }
      const event = await props.tx.event.create({
        data: {
          choice: {
            create: {
              aBetter: props.body.choice.aBetter,
              betterIndex: props.body.choice.betterIndex,
              aId: props.body.choice.aId,
              bId: props.body.choice.bId,
              random: props.body.choice.random,
              seeded: props.body.choice.seeded
            }
          },
          listId: props.body.listId,
          mergeChoiceId: events.length
        },
        include: {
          choice: CHOICE_RELATION
        }
      })
      return { ok: true, event }
    },
    request
  })
}
