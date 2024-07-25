'use client'

import publicListContext from './public-list-context'
import { List } from '@prisma/client'
import { Listing } from '@/listing/listing-types'
import PublicListConsumer from './public-list-consumer'

export default function PublicListView (props: {
  list: List
  listing: Listing
}): JSX.Element {
  const view = (
    <publicListContext.Provider
      list={props.list}
      listing={props.listing}
    >
      <PublicListConsumer />
    </publicListContext.Provider>
  )
  return view
}
