import { AuthBody } from './auth-types'
import { ApiError } from 'next/dist/server/api-utils'
import { hash } from 'bcrypt'
import { User } from '@prisma/client'
import { PrismaTransaction } from '@/prisma/prisma-types'

export default async function handlePostRegister (props: {
  body: AuthBody
  transaction: PrismaTransaction
}): Promise<User> {
  const existing = await props.transaction.user.findUnique({
    where: {
      email: props.body.email
    }
  })
  if (existing != null) {
    throw new ApiError(400, 'User already exists')
  }
  const user = await props.transaction.user.create({
    data: {
      email: props.body.email,
      password: await hash(props.body.password, 10)
    }
  })
  return user
}
