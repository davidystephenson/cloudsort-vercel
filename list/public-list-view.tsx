'use client'

import { Listing } from '@/listing/listing-types'
import postListing from '@/listing/postListing'
import LoaderView from '@/loader/loader-view'
import { useTheme } from '@/theme/theme-context'
import { List } from '@prisma/client'
import { useEffect, useState } from 'react'
import ListLoadingView from './list-loading-view'
import ListMultiloaderView from './list-multiloader-view'
import PublicListConsumer from './public-list-consumer'
import publicListContext from './public-list-context'

export default function PublicListView (props: {
  list: List
  listing: Listing
}): JSX.Element {
  const theme = useTheme()
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
  if (!theme.mounted) {
    return <ListMultiloaderView />
  }
  if (listing == null) {
    return (
      <ListLoadingView>
        <LoaderView />
      </ListLoadingView>
    )
  }
  return (
    <publicListContext.Provider
      list={props.list}
      listing={listing}
    >
      <PublicListConsumer />
    </publicListContext.Provider>
  )
}
