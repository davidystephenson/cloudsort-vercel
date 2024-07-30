import getSortedMovies from '@/movies/getSortedMovies'
import { Listing } from './listing-types'
import { RelatedList } from '@/list/list-types'
import listToHistory from '@/list/list-to-history'
import deduceState from '@/mergechoice/deduceState'
import { ItemHide } from '@prisma/client'
import getRankedMovies from '@/rank/get-ranked-movies'

export default function getListing (props: {
  itemHides?: ItemHide[]
  relatedList: RelatedList
}): Listing {
  const history = listToHistory({
    list: props.relatedList
  })
  const state = deduceState({ history, seed: props.relatedList.seed })
  const sorted = getSortedMovies({ state })
  const filtered = sorted.filter((movie) => {
    const hidden = props.itemHides?.some((itemHide) => {
      const hidden = itemHide.itemId === movie.id
      return hidden
    })
    return hidden !== true
  })
  const ranked = getRankedMovies({ sortedMovies: filtered })
  const cleaned = ranked.map((movie) => {
    const cleaned = { ...movie, seed: 0, points: 0 }
    return cleaned
  })
  return cleaned
}
