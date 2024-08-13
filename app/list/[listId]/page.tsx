'use server'

import serverAuth from '@/auth/server-auth'
import guardAccessibleList from '@/list/guard-accessible-list'
import ListView from '@/list/list-view'
import { ListsProvider } from '@/list/lists-context'
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
    const authSession = await serverAuth()
    const list = await guardAccessibleList({
      currentUserId: authSession?.user.id,
      db: prisma,
      listId
    })
    const rows = [list]
    const view = (
      <ListsProvider rows={rows}>
        <ListView
          currentUserId={authSession?.user.id}
          list={list}
        />
      </ListsProvider>
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
