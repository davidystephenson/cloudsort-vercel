import { ReactNode, forwardRef } from 'react'
import { useTheme } from './theme-context'
import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react'

const ThemeInputView = forwardRef<
HTMLInputElement,
InputProps & {
  debug?: boolean
  errorMessage?: string
  label?: string
  rightElement?: ReactNode
}
>((props, ref) => {
  const theme = useTheme()
  const { debug, type, errorMessage, label, rightElement, ...restProps } = props
  if (debug === true) {
    console.debug('mounted', theme.mounted)
  }
  const disabled = !theme.mounted
  if (debug === true) {
    console.debug('disabled', disabled)
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
  return (
    <FormControl isInvalid={invalid}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          variant='underlined'
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
