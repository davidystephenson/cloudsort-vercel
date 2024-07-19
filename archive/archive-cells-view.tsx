import { useList } from '@/list/list-context'
import { Heading } from '@chakra-ui/react'
import TableSpanView from '@/table/table-span-view'

export default function ArchiveCellsView (): JSX.Element {
  const list = useList()
  const archive = Object.values(list.state.archive)
  return (
    <TableSpanView>
      <Heading size='xs'>
        Archive ({archive.length})
      </Heading>
    </TableSpanView>
  )
}
