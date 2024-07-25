import privateListContext from '@/list/private-list-context'
import TableSpanView from '@/table/table-span-view'
import ThemeLinkableView from '@/theme/theme-linkable-view'
import { Heading } from '@chakra-ui/react'
import { MouseEvent } from 'react'

export default function HistoryCellsView (): JSX.Element {
  const list = privateListContext.useContext()
  function handleClick (event: MouseEvent): void {
    event.preventDefault()
    list.historyFlag.toggle()
  }
  return (
    <TableSpanView>
      <ThemeLinkableView href='#' onClick={handleClick}>
        <Heading size='sm'>
          History ({list.historySifter.sifted.length})
        </Heading>
      </ThemeLinkableView>
    </TableSpanView>
  )
}
