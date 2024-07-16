import { Prisma } from '@prisma/client'
import { State } from '../mergeChoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { EpisodesRelation } from '@/event/event-types'

export interface ListWhere {
  listId: number
  lastMergechoiceId: number | null
}
export interface CreateListRequest {
  name: string
}
export interface ListRequest {
  listId: number
}
export type RelatedList = Prisma.ListGetPayload<EpisodesRelation>
export interface MergechoiceList {
  list: RelatedList
  state: State<ListMovie>
}
