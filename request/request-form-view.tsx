'use client'

import { ComponentProps } from 'react'
import { FormProvider } from '../form/form-context'
import RequestFormController from './request-form-controller'

export default function RequestFormView (props: {
  endless?: boolean
  send: (props: { values: Record<string, string> }) => Promise<unknown>
} & ComponentProps<'form'>): JSX.Element {
  return (
    <FormProvider>
      <RequestFormController {...props} />
    </FormProvider>
  )
}
