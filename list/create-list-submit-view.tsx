'use client'

import { useForm } from '../form/form-context'
import SubmitRequestView from '../request/submit-request-view'

export default function CreateListSubmitView (): JSX.Element {
  const form = useForm()
  if (form.fields?.name.value == null || form.fields?.name.value === '') {
    return <></>
  }
  return (
    <SubmitRequestView>
      Create
    </SubmitRequestView>
  )
}
