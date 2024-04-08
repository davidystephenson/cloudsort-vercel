import { ApiError } from 'next/dist/server/api-utils'
import { NextResponse } from 'next/server'
import saveStateToList from './save-state-to-list'
import serverAuth from '@/auth/server-auth'
import respondAuthError from '@/auth/respond-auth-error'
import prisma from '@/prisma/prisma'
import { ListWhere, RelatedList } from './list-types'
import { State } from '@/mergeChoice/merge-choice-types'
import { Movie } from '@prisma/client'
import guardUserMergechoiceList from './guard-user-mergechoice-list'
import respondError from '@/respond/respond-error'
import respondOk from '@/respond/respond-ok'

export default async function updateList <Body extends ListWhere, Result> (props: {
  guard: (props: { data: unknown }) => Body
  request: Request
  respond: (props?: {
    body?: Body
    list?: RelatedList
    state?: State<Movie>
  }) => Result
  update: (props: { body: Body, state: State<Movie> }) => State<Movie>
}): Promise<Response> {
  const respond = props.respond ?? respondOk
  const authSession = await serverAuth()
  if (authSession == null) {
    return respondAuthError()
  }
  console.log('authSession.user', authSession.user)
  const json = await props.request.json()
  const body = props.guard({ data: json })
  try {
    const response = await prisma.$transaction(async (transaction) => {
      console.log('authSession.user.id', authSession.user.id)
      const mergeChoiceList = await guardUserMergechoiceList({
        listId: body.listId,
        userId: authSession.user.id
      })
      console.log('mergeChoiceList', mergeChoiceList)
      const newState = props.update({
        body,
        state: mergeChoiceList.state
      })
      await saveStateToList({
        list: mergeChoiceList.list,
        state: newState,
        tx: transaction
      })
      const response = respond({
        body,
        list: mergeChoiceList.list,
        state: newState
      })
      return response
    }, {
      isolationLevel: 'Serializable',
      maxWait: 5000, // default: 200
      timeout: 1000000 // default: 5000
    })
    return NextResponse.json(response)
  } catch (error) {
    if (error instanceof ApiError) {
      return respondError({ message: error.message, status: error.statusCode })
    }
    throw error
  }
}
