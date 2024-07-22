import { EpisodeChoice } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { HStack, Text } from '@chakra-ui/react'

export default function ChoiceEpisodeCellsView (props: {
  input: EpisodeChoice<ListMovie>
}): JSX.Element {
  const aName = props.input.aBetter ? <b>{props.input.aItem.name}</b> : props.input.aItem.name
  const bName = props.input.aBetter ? props.input.bItem.name : <b>{props.input.bItem.name}</b>
  const aIcon = props.input.aBetter ? <CheckIcon /> : <SmallCloseIcon />
  const bIcon = props.input.aBetter ? <SmallCloseIcon /> : <CheckIcon />
  return (
    <HStack>
      <Text>{aIcon} {aName}</Text>
      <Text>{' '}</Text>
      <Text>{bIcon} {bName}</Text>
    </HStack>
  )
}
