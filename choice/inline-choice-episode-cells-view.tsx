import { EpisodeChoice } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { HStack, Text } from '@chakra-ui/react'
import InlineChoiceNameView from './inline-choice-name-view'

export default function InlineChoiceEpisodeCellsView (props: {
  input: EpisodeChoice<ListMovie>
}): JSX.Element {
  const aIcon = props.input.aBetter
    ? <CheckIcon mb='2px' />
    : <SmallCloseIcon mb='2px' />
  const bIcon = props.input.aBetter
    ? <SmallCloseIcon mb='2px' />
    : <CheckIcon mb='2px' />
  return (
    <HStack>
      <InlineChoiceNameView
        icon={aIcon}
        name={props.input.aItem.name}
      />
      <Text>{' '}</Text>
      <InlineChoiceNameView
        icon={bIcon}
        name={props.input.bItem.name}
      />
    </HStack>
  )
}
