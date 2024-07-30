import { EpisodeChoice } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { HStack, Text } from '@chakra-ui/react'
import ChoiceNameView from './choice-name-view'

export default function ChoiceEpisodeCellsView (props: {
  input: EpisodeChoice<ListMovie>
}): JSX.Element {
  const aIcon = props.input.aBetter ? <CheckIcon /> : <SmallCloseIcon />
  const bIcon = props.input.aBetter ? <SmallCloseIcon /> : <CheckIcon />
  return (
    <HStack>
      <ChoiceNameView icon={aIcon} name={props.input.aItem.name} />
      <Text>{' '}</Text>
      <ChoiceNameView icon={bIcon} name={props.input.bItem.name} />
    </HStack>
  )
}
