import React, { useEffect } from 'react'
import { useForm } from './form-context'
import { InputProps } from '@nextui-org/react'
import ThemeInputView from '../theme/theme-input-view'

export default function FormFieldView (props: { name: string } & InputProps): JSX.Element {
  const form = useForm()

  useEffect(() => {
    form.register({
      name: props.name
    })

    function cleanup (): void {
      form.deregister({ name: props.name })
    }

    return cleanup
  }, [props.name, form.register])

  const field = form.fields[props.name]
  const disabled = field == null
  return (
    <ThemeInputView
      autoComplete={props.autoComplete}
      color='primary'
      errorMessage={field?.error}
      isDisabled={disabled}
      isRequired
      onChange={form.handleChange}
      ref={field?.ref}
      value={field?.value ?? ''}
      variant='underlined'
      {...props}
    />
  )
}
