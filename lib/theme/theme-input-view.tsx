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
  const dateField = props.type === 'date'
  const type = disabled && dateField ? 'text' : props.type
  return (
    <Input
      color='primary'
      variant='underlined'
      isDisabled={disabled}
      {...props}
      type={type}
      ref={ref}
    />
  )
})
export default ThemeInputView
