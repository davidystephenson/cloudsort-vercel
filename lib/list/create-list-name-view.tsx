'use client'

import FormFieldView from '../form/form-field-view'
import CreateListSubmitView from './create-list-submit-view'

export default function CreateListNameView (): JSX.Element {
  return (
    <FormFieldView
      name='name'
      placeholder='List Name'
      rightElement={<CreateListSubmitView />}
    />
  )
}
