import { State } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export interface DeduceEpisode {
  type: 'episode'
  index: number
}
export type DeduceHandlers = {
  [key in DeduceKey]: (props: {
    message: DeduceMessages[key]
  }) => void
}
export type DeduceKey = keyof DeduceMessages
export type DeduceMessage = DeduceMessages[DeduceKey]
export interface DeduceMessages {
  episode: DeduceEpisode
  state: DeduceState
}
export interface DeduceState {
  type: 'state'
  state: State<ListMovie>
}
