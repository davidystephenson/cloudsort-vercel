import { Input, InputProps } from '@nextui-org/react'
import { forwardRef } from 'react'
import { useTheme } from './theme-context'

const ThemeInputView = forwardRef<
HTMLInputElement,
InputProps & { debug?: boolean }
>((props, ref) => {
  const theme = useTheme()
  if (props.debug === true) {
    console.debug('mounted', theme.mounted)
  }
  const disabled = !theme.mounted
  if (props.debug === true) {
    console.debug('disabled', disabled)
  }
  return (
    <Input
      color='primary'
      variant='underlined'
      isDisabled={disabled}
      {...props}
      ref={ref}
    />
  )
})
export default ThemeInputView
