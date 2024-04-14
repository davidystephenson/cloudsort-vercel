import RequestIconButtonView from '../request/request-icon-button-view'
import { OptionallyLabeledIconButtonProps } from '@/theme/theme-types'
import { DeleteIcon } from '@chakra-ui/icons'

export default function DeleteIconButtonView (props: {
  send: () => Promise<void>
} & OptionallyLabeledIconButtonProps): JSX.Element {
  const ariaLabel = props['aria-label'] ?? 'Delete'
  return (
    <RequestIconButtonView
      colorScheme='red'
      icon={<DeleteIcon />}
      orientation='vertical'
      variant='ghost'
      {...props}
      aria-label={ariaLabel}
    />
  )
}
