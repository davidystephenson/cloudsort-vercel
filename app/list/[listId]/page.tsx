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
    if (!currentUserOwns) {
      const alert = (
        <Alert status='error'>
          <AlertIcon />
          List not found
        </Alert>
      )
      return alert
      // throw new ApiError(404, 'List not found')
    }
    if (list.hidden && list.userId !== authSession.user.id) {
      throw new ApiError(404, 'There is no list')
    }
    // const relatedList = await guardRelatedList({
    //   db: prisma,
    //   listId
    // })
    // const mergeChoiceList = await guardMergechoiceList({ db: prisma, listId })
    const view = (
      <ListView
        // relatedList={relatedList}
        id={list.id}
        name={list.name}
        seed={list.seed}
        userId={list.userId}
      />
    )
    return view
    // return (
    //   <Heading size='md'>ABC</Heading>
    // )
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
