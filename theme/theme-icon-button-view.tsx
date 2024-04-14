import { forwardRef } from 'react'
import { useTheme } from './theme-context'
import { IconButton, IconButtonProps } from '@chakra-ui/react'

const ThemeIconButtonView = forwardRef<HTMLButtonElement, IconButtonProps>((
  props,
  ref
) => {
  const theme = useTheme()
  const disabled = !theme.mounted
  return (
    <IconButton
      colorScheme='red'
      isDisabled={disabled}
      size='sm'
      variant='link'
      {...props}
      ref={ref}
    />
  )
})
export default ThemeIconButtonView
