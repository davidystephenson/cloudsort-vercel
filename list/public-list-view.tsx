'use client'

import publicListContext from './public-list-context'
import { List } from '@prisma/client'
import { Listing } from '@/listing/listing-types'
import PublicListConsumer from './public-list-consumer'
import { useEffect, useState } from 'react'
import postListing from '@/listing/postListing'
import { useTheme } from '@/theme/theme-context'
import ListLoaderView from './list-loader-view'
import ListMultiloaderView from './list-multiloader-view'

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
    return <ListLoaderView />
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
