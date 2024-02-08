'use client'

import { List } from '@prisma/client'
import { ListsProvider } from './lists-context'
import ListsTableView from './lists-table-view'
import CreateListFormView from './create-list-form-view'
import { Heading } from '@chakra-ui/react'

export default function ListsView (props: {
  rows: List[]
}): JSX.Element {
  return (
    <ListsProvider rows={props.rows}>
      <Heading size='lg'>Lists</Heading>
      <CreateListFormView />
      <ListsTableView />
    </ListsProvider>
  )
}
