import getMergeChoiceList from '@/lib/list/get-merge-choice-list'
import ListView from '@/lib/list/list-view'
import { Alert, AlertIcon } from '@chakra-ui/react'

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
    console.error(error)
    if (error instanceof Error) {
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
