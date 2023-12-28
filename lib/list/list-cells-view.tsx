import { ListProvider } from './list-context'
import { List } from '@prisma/client'
import ListCellsConsumer from './list-cells-consumer'

export default function ListCellsView (props: {
  row: List
}): JSX.Element {
  return (
    <ListProvider row={props.row}>
      <ListCellsConsumer />
    </ListProvider>
  )
}
