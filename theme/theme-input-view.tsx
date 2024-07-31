import { ReactNode, forwardRef } from 'react'
import { useTheme } from './theme-context'
import { FormControl, FormControlProps, FormErrorMessage, FormLabel, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react'

const ThemeInputView = forwardRef<
HTMLInputElement,
InputProps & {
  controlProps?: FormControlProps
  debug?: boolean
  errorMessage?: string
  label?: string
  rightElement?: ReactNode
}
>((props, ref) => {
  const theme = useTheme()
  const { debug, type, errorMessage, label, rightElement, ...restProps } = props
  const debugging = debug === true
  const disabled = !theme.mounted
  if (debugging) {
    console.debug('mounted', theme.mounted)
    console.debug('disabled', disabled)
    console.debug('restProps', restProps)
  }
  const dateField = type === 'date'
  const inputType = disabled && dateField ? 'text' : type
  const invalid = errorMessage != null
  const errorView = invalid && (
    <FormErrorMessage>{errorMessage}</FormErrorMessage>
  )
  const rightView = rightElement != null && (
    <InputRightElement w='fit-content'>{rightElement}</InputRightElement>
  )
  const labelView = label != null && <FormLabel>{label}</FormLabel>
  return (
    <FormControl isInvalid={invalid} {...props.controlProps}>
      {labelView}
      <InputGroup>
        <Input
          variant='flushed'
          isDisabled={disabled}
          {...restProps}
          type={inputType}
          ref={ref}
        />
        {rightView}
      </InputGroup>
      {errorView}
    </FormControl>
  )
})
export default ThemeInputView
