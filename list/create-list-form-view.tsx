'use client'

import { Fields } from '../form/form-types'
import RequestFormView from '../request/request-form-view'
import { useLists } from './lists-context'
import { useHeading } from '../heading/heading-context'
import CreateListNameView from './create-list-name-view'

export default function CreateListFormView (): JSX.Element {
  const heading = useHeading()
  const lists = useLists()

  if (heading.selection !== 'create') {
    return <></>
  }

  async function send (fields: Fields): Promise<void> {
    if (fields.name == null) {
      throw new Error('There is no name')
    }
    if (typeof fields.name.value !== 'string') {
      throw new Error('Name is not a string')
    }
    await lists.create({ name: fields.name.value })
  }

  return (
    <RequestFormView send={send}>
      <CreateListNameView />
    </RequestFormView>
  )
}
