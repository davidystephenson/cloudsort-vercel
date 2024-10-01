import { Marx } from '@/marx-worker/marxTypes'
import { DeduceKey, DeduceOutputs, DeduceState } from '@/deduce/deduce-types'
import { LastWhere, ListState } from '@/list/list-types'
import { State } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { Action } from '@/action/action-types'

export interface Rewind {
  action: Action
  index: number
  length?: number
  marx: Marx<RewindInput>
  savePoint: (savePointProps: {
    newState: ListState
    state: ListState
  }) => void
  start: (startProps: {
    episodeMergechoiceId: number
  }) => void
}
export type RewindHandler<
  Key extends DeduceKey,
  Props extends RewindProps<Key>
> = (props: Props) => void
export type RewindHandlers = {
  [Key in DeduceKey]: RewindHandler<Key, RewindProps<Key>>
}
export interface RewindInput {
  episodeId: number
  lastMergechoiceId: number
  listId: number
  state: State<ListMovie>
}
export type RewindOutput = RewindOutputs[DeduceKey]
export interface RewindOutputs extends DeduceOutputs {
  state: RewindState
}
export type RewindProps<Key extends DeduceKey> = RewindOutputs[Key]
export interface RewindRequest extends LastWhere {
  lastMergechoiceId: number
  episodeMergechoiceId: number
  snapshot: string
}
export interface RewindState extends DeduceState {
  episodeId: number
  lastMergechoiceId: number
}
