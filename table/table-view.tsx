import TableConsumer from './table-consumer'
import { TableProvider } from './table-context'
import { Identity } from './table-types'

export default function TableView<Row extends Identity> (props: {
  CellsView: (props: { row: Row }) => JSX.Element
  columns: string[]
  filterRows: (props: { query: string | undefined }) => void
  rows: Row[]
}): JSX.Element {
  const view = (
    <TableProvider
      columns={props.columns}
      filterRows={props.filterRows}
    >
      <TableConsumer
        CellsView={props.CellsView}
        rows={props.rows}
      />
    </TableProvider>
  )
  return view
}
