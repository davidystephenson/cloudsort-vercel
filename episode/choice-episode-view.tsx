import { EpisodeChoice } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { Box, Card, CardBody, CardHeader, HStack, Heading, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import episodeContext from './episode-context'

export default function ChoiceEpisodeView (props: {
  input: EpisodeChoice<ListMovie>
}): JSX.Element {
  const episode = episodeContext.useContext()
  const date = new Date(episode.doc.createdAt)
  const localeString = date.toLocaleString()
  const symbol = props.input.aBetter ? '>' : '<'
  return (
    <Card size='sm' mb='10px'>
      <CardHeader>
        <Heading size='sm'>
          Choice ({localeString})
        </Heading>
      </CardHeader>
      <CardBody>
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
      </CardBody>
    </Card>
  )
}
