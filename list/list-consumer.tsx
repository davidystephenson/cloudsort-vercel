'use client'

import { useListContext } from './list-context'
import PrivateListView from './private-list-view'
import PublicListView from './public-list-view'

export default function ListConsumer (): JSX.Element {
  const list = useListContext()
  if (list.private) {
    return (
      <PrivateListView />
    )
  }
  return (
    <PublicListView />
  )
}
