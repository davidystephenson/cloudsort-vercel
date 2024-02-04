'use client'

import FormFieldView from '../form/form-field-view'
import { Fields } from '../form/form-types'
import RequestFormView from '../request/request-form-view'
import SubmitRequestView from '../request/submit-request-view'
import { useLists } from './lists-context'

export default function CreateListFormView (): JSX.Element {
  const lists = useLists()

  async function send (fields: Fields): Promise<void> {
    if (fields.name == null) {
      throw new Error('There is no name')
    }
    if (typeof fields.name.value !== 'string') {
      throw new Error('Name is not a string')
    }
    await lists.create({ name: fields.name.value })
  }
  const end = (
    <SubmitRequestView>
      Create List
    </SubmitRequestView>
  )
  return (
    <RequestFormView send={send}>
      <FormFieldView
        debug
        name='name'
        label='Create'
        isRequired
        rightElement={end}
      />
    </RequestFormView>
  )
}
