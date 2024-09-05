import { Icon, IconProps } from '@chakra-ui/react'
import { FaFileExport } from 'react-icons/fa6'

export default function ExportIconView (props: IconProps): JSX.Element {
  return <Icon {...props} as={FaFileExport} />
}
