'use client'

import { List } from '@prisma/client'
import { ListsProvider } from './lists-context'
import ListsTableView from './lists-table-view'
import ListsHeadingView from './lists-heading-view'
import { HeadingProvider } from '../heading/heading-context'

export default function ListsView (props: {
  rows: List[]
}): JSX.Element {
  return (
    <ListsProvider rows={props.rows}>
      <HeadingProvider label='Lists'>
        <ListsHeadingView />
      </HeadingProvider>
      <ListsTableView />
    </ListsProvider>
  )
}
