import TableView from '@/table/table-view'
import { useList } from '../list/list-context'
import ArchiveCellsView from './archive-cells-view'

export default function ArchiveTableView (): JSX.Element {
  const list = useList()
  const columns = ['Name', 'Seed']
  return (
    <TableView
      CellsView={ArchiveCellsView}
      columns={columns}
      filter={list.filterArchive}
      rows={list.filteredArchive}
    />
  )
}
