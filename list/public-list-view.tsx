'use client'

import publicListContext from './public-list-context'
import { List } from '@prisma/client'
import { Listing } from '@/listing/listing-types'

export default async function PublicListView (props: {
  list: List
  listing: Listing
}): Promise<JSX.Element> {
  return (
    <publicListContext.Provider
      list={props.list}
      listing={props.listing}
    >
      <>Public List {props.list.name}</>
    </publicListContext.Provider>
  )
}
