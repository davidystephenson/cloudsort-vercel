'use server'

import { List } from '@prisma/client'
import PrivateListView from './private-list-view'
import PublicListView from './public-list-view'
import prisma from '@/prisma/prisma'
import guardRelatedList from './guard-related-list'
import listToHistory from './list-to-history'

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
    console.log('history.length', history.length)
    if (list.snapshot == null) {
      throw new Error('list.snapshot is null')
    }
    if (typeof list.snapshot !== 'string') {
      throw new Error('list.snapshot is not a string')
    }
    // console.log('list.snapshot.length:', list.snapshot.length)
    // const listState = JSON.parse(list.snapshot)
    // console.log('listState.choice:', listState.choice)
    // const snapState = { ...listState, history }
    // console.log('snapState.choice:', snapState.choice)
    // console.log('snapState.history.length:', snapState.history.length)
    return (
      <PrivateListView
        history={history}
        seed={list.seed}
      />
    )
  }
  return (
    <PublicListView
      list={props.list}
    />
  )
}
