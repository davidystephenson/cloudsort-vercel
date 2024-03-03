import { useList } from '../list/list-context'
import { ItemId } from '../mergeChoice/merge-choice-types'
import RequestButtonView from '../request/request-button-view'

export default function OptionView (props: {
  letter: string
  index: number
  id: ItemId
}): JSX.Element {
  const list = useList()
  const movie = list.state.items[props.id]
  if (movie == null) {
    throw new Error('There is no movie')
  }
  async function choose (): Promise<void> {
    await list.choose({ betterIndex: props.index })
  }
  return (
    <RequestButtonView send={choose}>
      [{props.letter}]
      {' '}
      {movie.name}
      {' '}
      ({movie.year})
    </RequestButtonView>
  )
}
