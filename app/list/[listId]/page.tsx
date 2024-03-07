import getMergeChoiceList from '@/lib/list/get-merge-choice-list'
import ListView from '@/lib/list/list-view'
import { Alert, AlertIcon } from '@chakra-ui/react'
import { ApiError } from 'next/dist/server/api-utils'

export default async function Lists (props: {
  params: {
    listId: string
  }
}): Promise<JSX.Element> {
  const listId = Number(props.params.listId)
  try {
    const mergeChoiceList = await getMergeChoiceList({ listId })
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
