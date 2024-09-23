'use server'

import { List } from '@prisma/client'
import PrivateListView from './private-list-view'
import PublicListView from './public-list-view'
import prisma from '@/prisma/prisma'
import guardRelatedList from './guard-related-list'
import listToHistory from './list-to-history'
import ListMounting from './list-mounting'

export default async function ListConsumer (props: {
  currentUserId?: number
  list: List
}): Promise<JSX.Element> {
  const _private = props.currentUserId === props.list.userId
  if (_private) {
    const list = await guardRelatedList({
      db: prisma,
      listId: props.list.id
    })
    const history = listToHistory({
      list
    })
    if (list.snapshot == null) {
      throw new Error('list.snapshot is null')
    }
    if (typeof list.snapshot !== 'string') {
      throw new Error('list.snapshot is not a string')
    }
    return (
      <ListMounting>
        <PrivateListView
          history={history}
          seed={list.seed}
        />
      </ListMounting>
    )
  }
  return (
    <ListMounting>
      <PublicListView
        list={props.list}
      />
    </ListMounting>
  )
}
