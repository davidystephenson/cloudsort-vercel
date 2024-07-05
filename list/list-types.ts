import { Prisma } from '@prisma/client'
import { State } from '../mergeChoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { EventsRelation } from '@/event/event-types'

export interface ListWhere {
  listId: number
  userId?: number
}
export interface CreateListRequest {
  name: string
}
export interface DeleteListRequest {
  listId: number
}
export type RelatedList = Prisma.ListGetPayload<EventsRelation>
export interface MergechoiceList {
  list: RelatedList
  state: State<ListMovie>
}
