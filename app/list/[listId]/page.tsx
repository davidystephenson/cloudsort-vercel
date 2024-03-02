import getMergeChoiceList from '@/lib/list/get-merge-choice-list'
import ListView from '@/lib/list/list-view'

export default async function Lists (props: {
  params: {
    listId: string
  }
}): Promise<JSX.Element> {
  const listId = Number(props.params.listId)
  const mergeChoiceList = await getMergeChoiceList({ listId })
  return (
    <>
      <ListView state={mergeChoiceList.state} row={mergeChoiceList.list} />
    </>
  )
}
