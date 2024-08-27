'use server'

import { List } from '@prisma/client'
import PrivateListView from './private-list-view'
import PublicListView from './public-list-view'
import guardListing from '@/listing/guard-listing'
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
    if (list.snapshot == null) {
      throw new Error('list.snapshot is null')
    }
    if (typeof list.snapshot !== 'string') {
      throw new Error('list.snapshot is not a string')
    }
    const listState = JSON.parse(list.snapshot)
    const snapState = { ...listState, history }
    return (
      <PrivateListView
        history={history}
        seed={list.seed}
        state={snapState}
      />
    )
  }
  const listing = await guardListing({
    db: prisma,
    listId: props.list.id
  })
  return (
    <PublicListView
      list={props.list}
      listing={listing}
    />
  )
}
