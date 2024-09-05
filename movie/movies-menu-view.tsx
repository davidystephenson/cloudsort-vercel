import ExportMenuItemView from '@/export/ExportMenuItemView'
import { useHeading } from '@/heading/heading-context'
import HideIconView from '@/hide/hide-icon-view'
import ImportMenuItemView from '@/import/import-menu-item-view'
import privateListContext from '@/list/private-list-context'
import MenuView from '@/menu/menu-view'
import RandomMenuItemView from '@/random/random-menu-item-view'
import themeContext from '@/theme/theme-context'
import { DeleteIcon } from '@chakra-ui/icons'
import { Icon, MenuItem, Spinner } from '@chakra-ui/react'
import { IoCreateSharp } from 'react-icons/io5'

export default function MoviesMenuView (): JSX.Element {
  const privateList = privateListContext.useContext()
  const heading = useHeading()
  const theme = themeContext.useContext()
  if (privateList.importAction.active) {
    const view = <Spinner size='xs' />
    return view
  }
  function handleCreate (): void {
    heading.select({ selection: 'create' })
  }
  function handleDelete (): void {
    void privateList.delete()
  }
  return (
    <>
      <MenuView>
        <RandomMenuItemView />
        <ImportMenuItemView />
        <MenuItem
          icon={<Icon as={IoCreateSharp} />}
          onClick={handleCreate}
        >
          Create Movie
        </MenuItem>
        <MenuItem
          icon={<HideIconView />}
        >
          Hide
        </MenuItem>
        <ExportMenuItemView />
        <MenuItem
          color={theme.red}
          icon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </MenuItem>
      </MenuView>
    </>
  )
}
