import getSortedMovies from '@/movies/getSortedMovies'
import { Listing } from './listing-types'
import { RelatedList } from '@/list/list-types'
import listToHistory from '@/list/list-to-history'
import deduceState from '@/mergechoice/deduceState'

export default function getListing (props: {
  relatedList: RelatedList
}): Listing {
  const history = listToHistory({
    list: props.relatedList
  })
  const state = deduceState({ history, seed: props.relatedList.seed })
  const listing = getSortedMovies({ state })
  return listing
}
