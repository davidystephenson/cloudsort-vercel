'use client'

import RequestFormView from '../request/request-form-view'
import { useLists } from './lists-context'
import { useHeading } from '../heading/heading-context'
import CreateListNameView from './create-list-name-view'
import guardString from '@/guard/guard-string'

export default function CreateListFormView (): JSX.Element {
  const heading = useHeading()
  const lists = useLists()

  if (heading.selection !== 'create') {
    return <></>
  }

  async function send (props: { values: Record<string, string> }): Promise<void> {
    const name = guardString({ value: props.values.name, label: 'name' })
    await lists.create({ name })
  }

  return (
    <RequestFormView send={send}>
      <CreateListNameView />
    </RequestFormView>
  )
}
