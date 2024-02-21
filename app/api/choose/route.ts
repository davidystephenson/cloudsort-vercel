import respondAuthError from '@/lib/auth/respond-auth-error'
import serverAuth from '@/lib/auth/server-auth'
import prisma from '@/lib/prisma/prisma'
import { NextResponse } from 'next/server'
import getMergeChoiceList from '@/lib/list/get-merge-choice-list'
import guardChooseMovie from '@/lib/movie/guard-choose-movie'
import saveStateToList from '@/lib/list/save-state-to-list'
import chooseOption from '@/lib/mergeChoice/chooseOption'
import { ApiError } from 'next/dist/server/api-utils'
import apiError from '@/lib/api/api-error'

export async function POST (req: Request): Promise<Response> {
  const authSession = await serverAuth()
  if (authSession == null) {
    return respondAuthError()
  }
  const json = await req.json()
  const body = guardChooseMovie({ data: json })
  try {
    const mergeChoiceList = await getMergeChoiceList({ listId: body.listId, userId: authSession.user.id })
    await prisma.$transaction(async (transaction) => {
      const newState = await chooseOption({
        betterIndex: body.betterIndex,
        state: mergeChoiceList.state
      })
      await saveStateToList({
        list: mergeChoiceList.list,
        state: newState,
        transaction
      })
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof ApiError) {
      const status = error.statusCode ?? 500
      return apiError({ message: error.message, status })
    }
    throw error
  }
}
