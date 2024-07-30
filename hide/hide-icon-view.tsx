import { Icon, IconProps } from '@chakra-ui/react'
import { BiSolidHide } from 'react-icons/bi'

export default function HideIconView (props: IconProps): JSX.Element {
  const view = (
    <Icon as={BiSolidHide} {...props} />
  )
  return view
}
