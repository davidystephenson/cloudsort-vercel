import { Icon, IconProps } from '@chakra-ui/react'
import { LuArchiveRestore } from 'react-icons/lu'

export default function UnarchiveItemView (props: IconProps): JSX.Element {
  return <Icon as={LuArchiveRestore} {...props} />
}
