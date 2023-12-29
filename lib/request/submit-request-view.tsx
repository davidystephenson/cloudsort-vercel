'use client'

import { ReactNode } from 'react'
import { useRequest } from './request-context'
import ButtonView from '../button/button-view'
import { useForm } from '../form/form-context'

export default function SubmitRequestView (props: {
  children: ReactNode
}): JSX.Element {
  const form = useForm()
  const request = useRequest()
  function onClick (): void {
    form.handleSubmit()
  }
  return (
    <ButtonView
      loading={request.loading}
      error={request.errorMessage}
      type='submit'
      handleClick={onClick}
    >
      {props.children}
    </ButtonView>
  )
}
