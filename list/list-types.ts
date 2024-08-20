import { Prisma } from '@prisma/client'
import { State } from '../mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { EpisodesRelation } from '@/episode/episode-types'

export interface CreateListRequest {
  name: string
}
export interface LastWhere extends ListWhere {
  lastMergechoiceId: number | null
}
export type ListState = Omit<State<ListMovie>, 'history'>
export interface ListWhere {
  listId: number
}
export interface MergechoiceList {
  list: RelatedList
  state: State<ListMovie>
}
export type RelatedList = Prisma.ListGetPayload<EpisodesRelation>
