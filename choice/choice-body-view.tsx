import { EpisodeChoice } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { Box, HStack, Heading, Stat, StatLabel, StatNumber } from '@chakra-ui/react'

export default function ChoiceBodyView (props: {
  input: EpisodeChoice<ListMovie>
}): JSX.Element {
  const symbol = props.input.aBetter ? '>' : '<'
  return (
    <HStack justifyContent='space-between'>
      <Box>
        <Stat size='xs'>
          <StatLabel>A</StatLabel>
          <StatNumber>
            {props.input.aItem.name}
          </StatNumber>
        </Stat>
      </Box>
      <Heading>
        {symbol}
      </Heading>
      <Box width='mih-content'>
        <Stat size='xs' width='fit-content'>
          <StatLabel>B</StatLabel>
          <StatNumber>
            {props.input.bItem.name}
          </StatNumber>
        </Stat>
      </Box>
    </HStack>
  )
}
