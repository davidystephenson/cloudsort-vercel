'use client'

import { List } from '@prisma/client'
import { ListsProvider } from './lists-context'
import ListsTableView from './lists-table-view'
import ListsHeadingView from './lists-heading-view'

export default function ListsView (props: {
  rows: List[]
}): JSX.Element {
  return (
    <ListsProvider rows={props.rows}>
      <ListsHeadingView />
      <ListsTableView />
    </ListsProvider>
  )
}
