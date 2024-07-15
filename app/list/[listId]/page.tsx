import guardMergechoiceList from '@/list/guard-mergechoice-list'
import ListView from '@/list/list-view'
import { Alert, AlertIcon } from '@chakra-ui/react'
import { ApiError } from 'next/dist/server/api-utils'
import prisma from '@/prisma/prisma'

export default async function Lists (props: {
  params: {
    listId: string
  }
}): Promise<JSX.Element> {
  const listId = Number(props.params.listId)
  try {
    const mergeChoiceList = await guardMergechoiceList({ db: prisma, listId })
    return (
      <>
        <ListView state={mergeChoiceList.state} row={mergeChoiceList.list} />
      </>
    )
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      return (
        <Alert status='error'>
          <AlertIcon />
          {error.message}
        </Alert>
      )
    }
    throw error
  }
}
