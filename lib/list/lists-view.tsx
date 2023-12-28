'use client'

import { List } from '@prisma/client'
import { ListsProvider } from './lists-context'
import ListsTableView from './lists-table-view'
import CreateListFormView from './create-list-form-view'

export default function ListsView (props: {
  rows: List[]
}): JSX.Element {
  return (
    <ListsProvider rows={props.rows}>
      <div className='text-3xl'>Lists</div>
      <CreateListFormView />
      <ListsTableView />
    </ListsProvider>
  )
}
