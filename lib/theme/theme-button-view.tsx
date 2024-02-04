import { forwardRef } from 'react'
import { useTheme } from './theme-context'
import { Button, ButtonProps } from '@chakra-ui/react'

const ThemeButtonView = forwardRef<HTMLButtonElement, ButtonProps>((
  props,
  ref
) => {
  const theme = useTheme()
  const disabled = !theme.mounted
  return (
    <Button
      colorScheme='purple'
      size='sm'
      isDisabled={disabled}
      {...props}
      ref={ref}
    />
  )
})
export default ThemeButtonView
