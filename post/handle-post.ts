import respondError from '@/respond/respond-error'
import { ApiError } from 'next/dist/server/api-utils'
import { NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'
import { PrismaTransaction } from '@/prisma/prisma-types'
import guardRequest from '@/guard/guard-request'

export async function handlePost <Body, Result> (props: {
  guard: (props: {
    label: string
    value: unknown
  }) => Body
  guardLabel: string
  handle: (props: {
    body: Body
    transaction: PrismaTransaction
  }) => Promise<Result>
  request: Request
}): Promise<Response> {
  try {
    const body = await guardRequest({
      guard: props.guard,
      guardLabel: props.guardLabel,
      request: props.request
    })
    const result = await prisma.$transaction(async (transaction) => {
      const result = await props.handle({ body, transaction })
      return result
    }, {
      isolationLevel: 'Serializable',
      maxWait: 5000, // default: 200
      timeout: 1000000 // default: 5000
    })
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof ApiError) {
      return respondError({ message: error.message, status: 500 })
    }
    throw error
  }
}
