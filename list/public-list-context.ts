import { Listing } from '@/listing/listing-types'
import siftMovie from '@/movie/sift-movie'
import useSifter from '@/sifter/use-sifter'
import { List } from '@prisma/client'
import contextCreator from 'context-creator'

const publicListContext = contextCreator({
  name: 'publicListContext',
  useValue: (props: {
    list: List
    listing: Listing
  }) => {
    const moviesSifter = useSifter({
      rows: props.listing,
      sift: siftMovie
    })
    const value = {
      list: props.list,
      listing: props.listing,
      moviesSifter
    }
    return value
  }
})
export default publicListContext
