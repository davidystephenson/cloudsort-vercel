import respondAuthError from '@/auth/respond-auth-error'
import serverAuth from '@/auth/server-auth'
import prisma from '@/prisma/prisma'
import { NextResponse } from 'next/server'
import getMergeChoiceList from '@/list/get-merge-choice-list'
import guardChooseMovie from '@/movie/guard-choose-movie'
import saveStateToList from '@/list/save-state-to-list'
import chooseOption from '@/mergeChoice/chooseOption'
import { ApiError } from 'next/dist/server/api-utils'
import apiError from '@/api/api-error'

async function sleep (ms: number): Promise<void> {
  return await new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function POST (req: Request): Promise<Response> {
  const authSession = await serverAuth()
  if (authSession == null) {
    return respondAuthError()
  }
  const json = await req.json()
  const body = guardChooseMovie({ data: json })
  await sleep(10000)
  try {
    const mergeChoiceList = await getMergeChoiceList({ listId: body.listId, userId: authSession.user.id })
    await prisma.$transaction(async (transaction) => {
      const newState = chooseOption({
        betterIndex: body.betterIndex,
        state: mergeChoiceList.state
      })
      newState.choice = body.choice
      await saveStateToList({
        list: mergeChoiceList.list,
        state: newState,
        tx: transaction
      })
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof ApiError) {
      return apiError({ message: error.message, status: error.statusCode })
    }
    throw error
  }
}
