import { EpisodeChoice } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { HStack } from '@chakra-ui/react'
import ChoiceNameView from './choice-name-view'

export default function ChoiceEpisodeCellsView (props: {
  input: EpisodeChoice<ListMovie>
}): JSX.Element {
  return (
    <HStack width='100%'>
      <ChoiceNameView
        better={props.input.aBetter}
        name={props.input.aItem.name}
      />
      <ChoiceNameView
        better={!props.input.aBetter}
        name={props.input.bItem.name}
      />
    </HStack>
  )
}
