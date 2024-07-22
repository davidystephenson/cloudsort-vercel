import { useList } from '@/list/list-context'
import { Heading } from '@chakra-ui/react'
import TableSpanView from '@/table/table-span-view'
import ThemeLinkableView from '@/theme/theme-linkable-view'

export default function ArchiveCellsView (): JSX.Element {
  const list = useList()
  function handleClick (): void {
    list.archiveFlag.toggle()
  }
  return (
    <TableSpanView>
      <ThemeLinkableView href='#' onClick={handleClick}>
        <Heading size='sm' onClick={handleClick}>
          Archive ({list.siftedArchive.length})
        </Heading>
      </ThemeLinkableView>
    </TableSpanView>
  )
}
