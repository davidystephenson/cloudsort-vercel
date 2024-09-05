import { Db } from '@/prisma/prisma-types'
import { Ranking } from './rankingTypes'
import guardRelatedList from '@/list/guard-related-list'
import getPublicRanking from './getPublicRanking'

export default async function guardRanking (props: {
  db: Db
  listId: number
}): Promise<Ranking> {
  const relatedList = await guardRelatedList({
    db: props.db,
    listId: props.listId
  })
  const ranking = await getPublicRanking({ db: props.db, relatedList })
  return ranking
}
