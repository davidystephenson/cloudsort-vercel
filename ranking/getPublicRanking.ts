import getSortedMovies from '@/movies/getSortedMovies'
import { Ranking } from './rankingTypes'
import { RelatedList } from '@/list/list-types'
import listToHistory from '@/list/list-to-history'
import deduceState from '@/mergechoice/deduceState'
import { Db } from '@/prisma/prisma-types'
import moviesToRanking from './moviesToRanking'

export default async function getPublicRanking (props: {
  db: Db
  relatedList: RelatedList
}): Promise<Ranking> {
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
  const ranking = moviesToRanking({ sortedMovies: filtered })
  return ranking
}
