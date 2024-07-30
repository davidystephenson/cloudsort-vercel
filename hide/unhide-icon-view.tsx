import { Icon, IconProps } from '@chakra-ui/react'
import { BiSolidShow } from 'react-icons/bi'

export default function UnhideIconView (props: IconProps): JSX.Element {
  const view = (
    <Icon as={BiSolidShow} {...props} />
  )
  return view
}
