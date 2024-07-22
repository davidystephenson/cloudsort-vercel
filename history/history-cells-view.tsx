import listContext from '@/list/list-context'
import TableSpanView from '@/table/table-span-view'
import ThemeLinkableView from '@/theme/theme-linkable-view'
import { Heading } from '@chakra-ui/react'
import { MouseEvent } from 'react'

export default function HistoryCellsView (): JSX.Element {
  const list = listContext.useContext()
  function handleClick (event: MouseEvent): void {
    event.preventDefault()
    list.toggleHistory()
  }
  const href = list.siftedEpisodes.length === 1 ? undefined : '#'
  return (
    <TableSpanView>
      <ThemeLinkableView href={href} onClick={handleClick}>
        <Heading size='sm'>
          History ({list.siftedEpisodes.length})
        </Heading>
      </ThemeLinkableView>
    </TableSpanView>
  )
}
