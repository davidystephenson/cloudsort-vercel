'use client'

import publicListContext from './public-list-context'
import { List } from '@prisma/client'
import { Listing } from '@/listing/listing-types'
import PublicListConsumer from './public-list-consumer'
import { useEffect, useState } from 'react'
import postListing from '@/listing/postListing'
import ListLoadingView from './list-loading-view'

export default function PublicListView (props: {
  list: List
  listing: Listing
}): JSX.Element {
  const [listing, setListing] = useState<Listing>()
  useEffect(() => {
    async function download (): Promise<void> {
      const payload = await postListing({
        label: 'PublicListView',
        listId: props.list.id
      })
      setListing(payload.listing)
    }
    void download()
  }, [props.list.id])
  const view = (
    <ListLoadingView
      data={listing}
      View={(listLoadingViewProps) => {
        const view = (
          <publicListContext.Provider
            list={props.list}
            listing={listLoadingViewProps.data}
          >
            <PublicListConsumer />
          </publicListContext.Provider>
        )
        return view
      }}
    />
  )
  return view
}
