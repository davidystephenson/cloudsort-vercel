import { List } from '@prisma/client'
import ListCellsConsumer from './list-cells-consumer'

export default function ListCellsView (props: {
  row: List
}): JSX.Element {
  return (
    <ListCellsConsumer list={props.row} />
  )
}
