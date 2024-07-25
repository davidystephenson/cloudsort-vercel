import { Listing } from '@/listing/listing-types'
import { List } from '@prisma/client'
import contextCreator from 'context-creator'

const publicListContext = contextCreator({
  name: 'publicListContext',
  useValue: (props: {
    list: List
    listing: Listing
  }) => {
    const value = {
      list: props.list,
      listing: props.listing
    }
    return value
  }
})
export default publicListContext
