import respondError from '@/respond/respond-error'
import { ApiError } from 'next/dist/server/api-utils'
import { NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'
import { PrismaTransaction } from '@/prisma/prisma-types'
import guardRequest from '@/fashion-police/guard-request'
import { Guard } from '@/fashion-police/fashionPoliceTypes'
import { HandledResponse } from './handle-types'

export async function handleBody <Body, Result> (props: {
  guard: Guard<Body>
  label: string
  handle: (props: {
    body: Body
    transaction: PrismaTransaction
  }) => Promise<Result>
  request: Request
}): HandledResponse<Result> {
  try {
    const body = await guardRequest({
      guard: props.guard,
      label: props.label,
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
    const payload = { ok: true, ...result } as const
    const response = NextResponse.json(payload)
    return response
  } catch (error) {
    if (error instanceof ApiError) {
      const response = respondError({
        message: error.message,
        status: error.statusCode
      })
      return response
    }
    throw error
  }
}
