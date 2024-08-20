'use server'

import { List } from '@prisma/client'
import PrivateListView from './private-list-view'
import PublicListView from './public-list-view'
import guardListing from '@/listing/guard-listing'
import prisma from '@/prisma/prisma'
import guardRelatedList from './guard-related-list'
import listToHistory from './list-to-history'
import deduceState from '@/mergechoice/deduceState'

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
    const state = deduceState({
      history,
      seed: list.seed
    })
    const { history: deducedHistory, ...listState } = state
    const snapshot = JSON.stringify(listState)
    await prisma.list.update({
      data: {
        snapshot
      },
      where: {
        id: props.list.id
      }
    })
    return (
      <PrivateListView
        history={history}
        seed={list.seed}
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
