import { AuthRequest } from './auth-types'
import { ApiError } from 'next/dist/server/api-utils'
import { hash } from 'bcrypt'
import { User } from '@prisma/client'
import { Db } from '@/prisma/prisma-types'

export default async function handlePostRegister (props: {
  request: AuthRequest
  db: Db
}): Promise<User> {
  const existing = await props.db.user.findUnique({
    where: {
      email: props.request.email
    }
  })
  if (existing != null) {
    throw new ApiError(400, 'User already exists')
  }
  const user = await props.db.user.create({
    data: {
      email: props.request.email,
      password: await hash(props.request.password, 10)
    }
  })
  return user
}
