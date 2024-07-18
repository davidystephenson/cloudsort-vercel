import { TableProvider } from '../table/table-context'
import TableConsumer from './table-consumer'
import { Identity } from './table-types'

export default function TableView<Row extends Identity> (props: {
  CellsView: (props: { row: Row }) => JSX.Element
  columns: string[]
  filter: (props: { query: string | undefined }) => void
  rows: Row[]
}): JSX.Element {
  return (
    <>
      <div>TABLE</div>
      <TableProvider
        columns={props.columns}
        filter={props.filter}
      >
        <TableConsumer
          CellsView={props.CellsView}
          rows={props.rows}
        />
      </TableProvider>
    </>
  )
}
