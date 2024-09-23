import { Prisma } from '@prisma/client'
import { State } from '../mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { EpisodesRelation } from '@/episode/episode-types'

export interface CreateListRequest {
  name: string
}
export type ListSnapshot = Omit<State<ListMovie>, 'history'>
export type ListState = State<ListMovie>
export interface ListWhere {
  listId: number
}
export interface LastWhere extends ListWhere {
  lastMergechoiceId: number | null
}
export interface MergechoiceList {
  list: RelatedList
  state: ListState
}
export type RelatedList = Prisma.ListGetPayload<EpisodesRelation>
