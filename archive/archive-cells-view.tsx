import { Heading } from '@chakra-ui/react'
import TableSpanView from '@/table/table-span-view'
import ThemeLinkableView from '@/theme/theme-linkable-view'
import privateListContext from '@/list/private-list-context'

export default function ArchiveCellsView (): JSX.Element {
  const list = privateListContext.useContext()
  function handleClick (): void {
    list.archiveFlag.toggle()
  }
  return (
    <TableSpanView>
      <ThemeLinkableView href='#' onClick={handleClick}>
        <Heading size='sm' onClick={handleClick}>
          Archive ({list.archiveSifter.sifted.length})
        </Heading>
      </ThemeLinkableView>
    </TableSpanView>
  )
}
