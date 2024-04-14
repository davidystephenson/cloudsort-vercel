import saveStateToList from './save-state-to-list'
import { ListWhere } from './list-types'
import { State } from '@/mergeChoice/mergeChoiceTypes'
import { Movie } from '@prisma/client'
import guardUserMergechoiceList from './guard-user-mergechoice-list'
import { handleAuthPost } from '@/post/handle-auth-post'

export default async function updateList <Body extends ListWhere> (props: {
  guardBody: (props: {
    label: string
    value: unknown
  }) => Body
  guardLabel: string
  guardUpdate?: (props: { body: Body, state: State<Movie> }) => Promise<void>
  request: Request
  update: (props: { body: Body, state: State<Movie> }) => State<Movie>
}): Promise<Response> {
  return await handleAuthPost({
    guard: props.guardBody,
    guardLabel: props.guardLabel,
    handle: async (handleProps) => {
      const mergeChoiceList = await guardUserMergechoiceList({
        listId: handleProps.body.listId,
        userId: handleProps.authSession.user.id
      })
      await props.guardUpdate?.({
        body: handleProps.body,
        state: mergeChoiceList.state
      })
      const newState = props.update({
        body: handleProps.body,
        state: mergeChoiceList.state
      })
      await saveStateToList({
        list: mergeChoiceList.list,
        state: newState,
        tx: handleProps.tx
      })
      return { ok: true }
    },
    request: props.request
  })
}
