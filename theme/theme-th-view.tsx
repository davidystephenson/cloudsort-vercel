import { TableColumnHeaderProps, Th } from '@chakra-ui/react'
import { useTheme } from './theme-context'

export default function ThemeThView (props: TableColumnHeaderProps): JSX.Element {
  const theme = useTheme()
  return (
    <Th borderBottomColor={theme.borderColor} {...props} />
  )
}
