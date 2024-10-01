import addMarx from '@/marx-worker/addMarx'
import { OptionChoice } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { ListState } from '@/list/list-types'
import chooseOption from '@/mergechoice/chooseOption'

addMarx<OptionChoice<ListMovie>, ListState>((props) => {
  const chosenState = chooseOption({
    betterIndex: props.input.betterIndex,
    state: props.input.state
  })
  props.post(chosenState)
})
