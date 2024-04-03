import { MergechoiceList } from './list-types'
import guardRelatedList from './guard-related-list'
import getMergechoiceList from './get-mergechoice-list'

export default async function guardMergechoiceList (props: {
  listId: number
}): Promise<MergechoiceList> {
  const list = await guardRelatedList({
    listId: props.listId
  })
  const mergechoiceList = await getMergechoiceList({
    list
  })
  return mergechoiceList
}
