'use client'

import { ReactNode } from 'react'
import { FormProvider } from '../form/form-context'
import { Fields } from '../form/form-types'
import RequestFormController from './request-form-controller'

export default function RequestFormView (props: {
  children: ReactNode
  endless?: boolean
  send: (fields: Fields) => Promise<unknown>
}): JSX.Element {
  return (
    <FormProvider>
      <RequestFormController endless={props.endless} send={props.send}>
        {props.children}
      </RequestFormController>
    </FormProvider>
  )
}
