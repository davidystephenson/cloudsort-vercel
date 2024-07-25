import useFlagbearer from '@/flagbearer/use-flagbearer'
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
    const moviesFlag = useFlagbearer({ initial: true })
    const movieSifter = useSifter({
      rows: props.listing,
      sift: siftMovie
    })
    const value = {
      list: props.list,
      listing: props.listing,
      moviesFlag,
      movieSifter
    }
    return value
  }
})
export default publicListContext
