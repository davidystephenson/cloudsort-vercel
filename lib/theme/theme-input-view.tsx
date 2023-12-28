import { Input, InputProps } from '@nextui-org/react'
import { forwardRef } from 'react'
import useMounted from '../mounted/use-mounted'

const ThemeInputView = forwardRef<
HTMLInputElement,
InputProps & { debug?: boolean }
>((props, ref) => {
  const mounted = useMounted()
  if (props.debug === true) {
    console.log('mounted', mounted)
  }
  const disabled = !mounted
  if (props.debug === true) {
    console.log('disabled', disabled)
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
