import { TableCellProps, Td } from '@chakra-ui/react'
import { useTheme } from './theme-context'

export default function ThemeTdView (props: TableCellProps): JSX.Element {
  const theme = useTheme()
  return (
    <Td borderBottomColor={theme.borderColor} {...props} />
  )
}
