import guardMergechoiceList from '@/list/guard-mergechoice-list'
import ListView from '@/list/list-view'
import prisma from '@/prisma/prisma'
import { Alert, AlertIcon } from '@chakra-ui/react'
import { ApiError } from 'next/dist/server/api-utils'

export default async function Lists (props: {
  params: {
    listId: string
  }
}): Promise<JSX.Element> {
  const listId = Number(props.params.listId)
  try {
    const mergeChoiceList = await guardMergechoiceList({ db: prisma, listId })
    const view = <ListView state={mergeChoiceList.state} row={mergeChoiceList.list} />
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
