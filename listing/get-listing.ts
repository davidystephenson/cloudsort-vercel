import getSortedMovies from '@/movies/getSortedMovies'
import { Listing } from './listing-types'
import { RelatedList } from '@/list/list-types'
import listToHistory from '@/list/list-to-history'
import deduceState from '@/mergechoice/deduceState'
import { ItemHide } from '@prisma/client'

export default function getListing (props: {
  itemHides?: ItemHide[]
  relatedList: RelatedList
}): Listing {
  const history = listToHistory({
    list: props.relatedList
  })
  const state = deduceState({ history, seed: props.relatedList.seed })
  const sorted = getSortedMovies({ state })
  const listing = sorted.filter((movie) => {
    const hidden = props.itemHides?.some((itemHide) => {
      const hidden = itemHide.itemId === movie.id
      return hidden
    })
    return hidden !== true
  })
  return listing
}
