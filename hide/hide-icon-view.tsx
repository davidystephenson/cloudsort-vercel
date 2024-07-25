import { Icon, IconProps } from '@chakra-ui/react'
import { BiSolidHide } from 'react-icons/bi'

export default function HideIconView (props: IconProps): JSX.Element {
  return (
    <Icon as={BiSolidHide} {...props} />
  )
}
