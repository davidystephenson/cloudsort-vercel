import { AuthBody } from './auth-types'
import { ApiError } from 'next/dist/server/api-utils'
import { hash } from 'bcrypt'
import { User } from '@prisma/client'
import { Db } from '@/prisma/prisma-types'

export default async function handlePostRegister (props: {
  body: AuthBody
  db: Db
}): Promise<User> {
  const existing = await props.db.user.findUnique({
    where: {
      email: props.body.email
    }
  })
  if (existing != null) {
    throw new ApiError(400, 'User already exists')
  }
  const user = await props.db.user.create({
    data: {
      email: props.body.email,
      password: await hash(props.body.password, 10)
    }
  })
  return user
}
