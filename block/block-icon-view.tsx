import themeContext from '@/theme/theme-context'
import { Icon, IconProps } from '@chakra-ui/react'
import { SiAdblock } from 'react-icons/si'

export default function BlockIconView (props: IconProps): JSX.Element {
  const theme = themeContext.useContext()
  return (
    <Icon as={SiAdblock} color={theme.red} {...props} />
  )
}
