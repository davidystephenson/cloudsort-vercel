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
export type DeduceKey = keyof DeduceMessages
export type DeduceMessage = DeduceMessages[DeduceKey]
export interface DeduceMessages {
  episode: DeduceEpisode
  state: DeduceState
}
export interface DeduceProps <Key extends DeduceKey> {
  message: DeduceMessages[Key]
}
export interface DeduceState {
  type: 'state'
  state: State<ListMovie>
}
