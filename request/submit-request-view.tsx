'use client'

import { ReactNode } from 'react'
import { useRequest } from './request-context'
import ButtonView from '../button/button-view'
import { useForm } from '../form/form-context'

export default function SubmitRequestView (props: {
  leftButton?: JSX.Element
  children: ReactNode
}): JSX.Element {
  const form = useForm()
  const request = useRequest()
  function onClick (): void {
    form.handleSubmit()
  }
  const view = (
    <ButtonView
      leftButton={props.leftButton}
      loading={request.acting}
      errorMessage={request.errorMessage}
      type='submit'
      handleClick={onClick}
    >
      {props.children}
    </ButtonView>
  )
  return view
}
