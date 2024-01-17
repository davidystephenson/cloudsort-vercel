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
  if (props.debug === true) {
    console.debug('mounted', theme.mounted)
  }
  const disabled = !theme.mounted
  if (props.debug === true) {
    console.debug('disabled', disabled)
  }
  const dateField = props.type === 'date'
  const type = disabled && dateField ? 'text' : props.type
  const invalid = props.errorMessage != null
  const errorView = invalid && (
    <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
  )
  const rightView = props.rightElement != null && (
    <InputRightElement>{props.rightElement}</InputRightElement>
  )
  return (
    <FormControl isInvalid={invalid}>
      <FormLabel>{props.label}</FormLabel>
      <InputGroup>
        <Input
          variant='underlined'
          isDisabled={disabled}
          {...props}
          type={type}
          ref={ref}
        />
        {rightView}
      </InputGroup>
      {errorView}
    </FormControl>
  )
})
export default ThemeInputView
