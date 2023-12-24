import FormFieldView from '../form/form-field-view'

export default function AuthFormFieldsView (): JSX.Element {
  return (
    <>
      <FormFieldView
        autoComplete='email'
        color='primary'
        label='Email'
        name='email'
        isRequired
        type='email'
      />
      <FormFieldView
        autoComplete='current-password'
        color='primary'
        label='Password'
        name='password'
        isRequired
        type='password'
      />
    </>
  )
}
