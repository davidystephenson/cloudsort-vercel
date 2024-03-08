'use client'

import { ComponentProps } from 'react'
import { FormProvider } from '../form/form-context'
import { Fields } from '../form/form-types'
import RequestFormController from './request-form-controller'

export default function RequestFormView (props: {
  endless?: boolean
  send: (fields: Fields) => Promise<unknown>
} & ComponentProps<'form'>): JSX.Element {
  return (
    <FormProvider>
      <RequestFormController {...props} />
    </FormProvider>
  )
}
