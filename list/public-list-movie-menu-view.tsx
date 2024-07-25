import BlockIconView from '@/block/block-icon-view'
import ImportIconView from '@/import/import-icon-view'
import MenuView from '@/menu/menu-view'
import { useTheme } from '@/theme/theme-context'
import { MenuItem } from '@chakra-ui/react'

export default function PublicListMovieMenuView (): JSX.Element {
  const theme = useTheme()
  return (
    <MenuView>
      <MenuItem
        color={theme.red}
        icon={<ImportIconView />}
      >
        Import
      </MenuItem>
      <MenuItem
        color={theme.red}
        icon={<BlockIconView />}
      >
        Block
      </MenuItem>
    </MenuView>
  )
}
