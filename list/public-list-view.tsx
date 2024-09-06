'use client'

import { Ranking } from '@/ranking/rankingTypes'
import postRanking from '@/ranking/postRanking'
import LoaderView from '@/loader/loader-view'
import { List } from '@prisma/client'
import { useEffect, useState } from 'react'
import ListLoadingView from './list-loading-view'
import PublicListConsumer from './public-list-consumer'
import publicListContext from './public-list-context'

export default function PublicListView (props: {
  list: List
}): JSX.Element {
  const [ranking, setRanking] = useState<Ranking>()
  useEffect(() => {
    async function download (): Promise<void> {
      const payload = await postRanking({
        label: 'PublicListView',
        listId: props.list.id
      })
      setRanking(payload.ranking)
    }
    void download()
  }, [props.list.id])
  if (ranking == null) {
    return (
      <ListLoadingView>
        <LoaderView />
      </ListLoadingView>
    )
  }
  return (
    <publicListContext.Provider
      list={props.list}
      ranking={ranking}
    >
      <PublicListConsumer />
    </publicListContext.Provider>
  )
}
