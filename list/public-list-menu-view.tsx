import MenuView from '@/menu/menu-view'
import { MenuItem } from '@chakra-ui/react'
import publicListContext from './public-list-context'
import ExportIconView from '@/export/ExportIconView'

export default function PublicListMenuView (): JSX.Element {
  const publicList = publicListContext.useContext()
  function handleExport (): void {
    publicList.export()
  }
  return (
    <MenuView>
      <MenuItem
        icon={<ExportIconView />}
        onClick={handleExport}
      >
        Export
      </MenuItem>
    </MenuView>
  )
}
