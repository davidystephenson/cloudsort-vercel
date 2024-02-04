import React, { ReactNode, useEffect } from 'react'
import { useForm } from './form-context'
import ThemeInputView from '../theme/theme-input-view'
import { InputProps } from '@chakra-ui/react'

export default function FormFieldView (props: {
  debug?: boolean
  name: string
  label?: string
  rightElement?: ReactNode
} & InputProps): JSX.Element {
  const form = useForm()

  useEffect(() => {
    const dateField = props.type === 'date'
    const value = props.defaultValue != null
      ? String(props.defaultValue)
      : dateField
        ? new Date().toISOString().slice(0, 10)
        : undefined
    form.register({
      name: props.name,
      value
    })

    function cleanup (): void {
      form.deregister({ name: props.name })
    }

    return cleanup
  }, [props.name, props.type, form.register])

  const field = form.fields[props.name]
  const disabled = field == null
  const value = field?.value ?? ''
  if (props.debug === true) {
    console.debug('value', value)
  }
  return (
    <ThemeInputView
      autoComplete={props.autoComplete}
      debug={props.debug}
      errorMessage={field?.error}
      isDisabled={disabled}
      onChange={form.handleChange}
      ref={field?.ref}
      value={value}
      {...props}
    />
  )
}
