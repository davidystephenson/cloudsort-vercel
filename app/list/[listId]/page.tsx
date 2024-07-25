'use server'

import serverAuth from '@/auth/server-auth'
import ListView from '@/list/list-view'
import prisma from '@/prisma/prisma'
import { Alert, AlertIcon } from '@chakra-ui/react'
import { ApiError } from 'next/dist/server/api-utils'

export default async function ListIdPage (props: {
  params: {
    listId: string
  }
}): Promise<JSX.Element> {
  const listId = Number(props.params.listId)
  try {
    const list = await prisma.list.findUnique({
      where: { id: listId }
    })
    if (list == null) {
      throw new ApiError(404, 'List not found')
    }
    const authSession = await serverAuth()
    console.log('authSession?.user.id', authSession?.user.id)
    const currentUserOwns = authSession?.user.id === list.userId
    console.log('currentUserOwns', currentUserOwns)
    if (list.hidden && !currentUserOwns) {
      throw new ApiError(404, 'There is no list')
    }
    const view = (
      <ListView
        id={list.id}
        name={list.name}
        seed={list.seed}
        userId={list.userId}
      />
    )
    return view
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      const alert = (
        <Alert status='error'>
          <AlertIcon />
          {error.message}
        </Alert>
      )
      return alert
    }
    throw error
  }
}
