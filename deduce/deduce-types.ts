import { ListHistory } from '@/history/history-types'
import { ListState } from '@/list/list-types'
import { State } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export interface DeduceEpisode {
  type: 'episode'
  index: number
}
export type DeduceHandler <
  Key extends DeduceKey,
  Props extends DeduceProps<Key>
> = (props: Props) => void
export type DeduceHandlers = {
  [Key in DeduceKey]: DeduceHandler<Key, DeduceProps<Key>>
}
export interface DeduceInput {
  history: ListHistory
  seed: string
}
export type DeduceKey = keyof DeduceOutputs
export type DeduceOutput = DeduceOutputs[DeduceKey]
export interface DeduceOutputs {
  episode: DeduceEpisode
  state: DeduceState
}
export type DeduceProps<Key extends DeduceKey> = DeduceOutputs[Key]
export interface DeduceState {
  type: 'state'
  state: State<ListMovie>
}
export interface Deduction {
  index: number
  state?: ListState
}
