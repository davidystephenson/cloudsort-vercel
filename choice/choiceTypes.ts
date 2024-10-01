import { Action } from '@/action/action-types'
import { Marx } from '@/marx-worker/marxTypes'
import { OptionChoice } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export type ListOptionChoice = OptionChoice<ListMovie>

export interface Choice {
  action: Action
  marx: Marx<ListOptionChoice>
  choose: (optionChoice: ListOptionChoice) => void
}
