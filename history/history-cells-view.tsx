import listContext from '@/list/list-context'
import TableSpanView from '@/table/table-span-view'
import { Heading } from '@chakra-ui/react'

export default function HistoryCellsView (): JSX.Element {
  const list = listContext.useContext()
  return (
    <TableSpanView>
      <Heading size='sm'>
        History ({list.state.history.length})
      </Heading>
    </TableSpanView>
  )
}
