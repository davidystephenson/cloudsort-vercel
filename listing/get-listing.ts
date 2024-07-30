import getSortedMovies from '@/movies/getSortedMovies'
import { Listing } from './listing-types'
import { RelatedList } from '@/list/list-types'
import listToHistory from '@/list/list-to-history'
import deduceState from '@/mergechoice/deduceState'
import getRankedMovies from '@/rank/get-ranked-movies'
import { Db } from '@/prisma/prisma-types'

export default async function getListing (props: {
  db: Db
  relatedList: RelatedList
}): Promise<Listing> {
  const itemHides = await props.db.itemHide.findMany({
    where: {
      userId: props.relatedList.userId
    }
  })
  const history = listToHistory({
    list: props.relatedList
  })
  const state = deduceState({ history, seed: props.relatedList.seed })
  const sorted = getSortedMovies({ state })
  const filtered = sorted.filter((movie) => {
    const hidden = itemHides.some((itemHide) => {
      const hidden = itemHide.itemId === movie.id
      return hidden
    })
    return !hidden
  })
  const ranked = getRankedMovies({ sortedMovies: filtered })
  const cleaned = ranked.map((movie) => {
    const cleaned = { ...movie, seed: 0, points: 0 }
    return cleaned
  })
  return cleaned
}
