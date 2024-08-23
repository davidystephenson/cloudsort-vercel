import { DeduceKey, DeduceMessages, DeduceState } from '@/deduce/deduce-types'
import { LastWhere } from '@/list/list-types'

export type RewindHandler <
  Key extends DeduceKey,
  Props extends RewindProps<Key>
> = (props: Props) => void
export type RewindHandlers = {
  [Key in DeduceKey]: RewindHandler<Key, RewindProps<Key>>
}
export type RewindMessage = RewindMessages[DeduceKey]
export interface RewindMessages extends DeduceMessages {
  state: RewindState
}
export interface RewindProps <Key extends DeduceKey> {
  message: RewindMessages[Key]
}
export interface RewindRequest extends LastWhere {
  lastMergechoiceId: number
  episodeMergechoiceId: number
  snapshot: string
}
export interface RewindState extends DeduceState {
  episodeId: number
  lastMergechoiceId: number
}
