import { ListWhere } from '../list/list-types'
import { Event } from '@prisma/client'
import { Guard } from '@/guard/guard-types'
import { ApiError } from 'next/dist/server/api-utils'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { HandledResponse } from '@/handle/handle-types'
import { handleAuth } from '@/handle/handle-auth'

export default async function handleEvent<Body extends ListWhere> (props: {
  guard: Guard<Body>
  label: string
  createEvent: (props: { body: Body, events: Event[], tx: PrismaTransaction }) => Promise<Event>
  request: Request
}): HandledResponse<{ event: Event }> {
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
      const events = await authProps.tx.event.findMany({
        where: { listId: authProps.body.listId }
      })
      const sortedEvents = events.sort((a, b) => {
        if (a.createdAt < b.createdAt) return -1
        if (a.createdAt > b.createdAt) return 1
        return 0
      })
      const lastEvent = sortedEvents[sortedEvents.length - 1]
      const eventWrong = lastEvent != null && lastEvent.mergeChoiceId === authProps.body.lastChoiceMergechoiceId
      if (eventWrong) {
        throw new ApiError(400, 'That is not the last event.')
      }
      const event = await props.createEvent({
        body: authProps.body,
        events,
        tx: authProps.tx
      })
      return { ok: true, event }
    },
    request: props.request
  })
  return response
}
