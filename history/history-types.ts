import { HandledResponse } from '@/handle/handle-types'
import { ListMovie } from '@/movie/movie-types'
import { History } from '@/mergechoice/mergeChoiceTypes'

export type ListHistory = History<ListMovie>
export interface HistoryResponse {
  history: ListHistory
}
export type HandledHistory = HandledResponse<HistoryResponse>
