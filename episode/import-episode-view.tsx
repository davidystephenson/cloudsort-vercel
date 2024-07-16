import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import episodeContext from './episode-context'
import { EpisodeImport } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export default function ImportEpisodeView (props: {
  input: EpisodeImport<ListMovie>
}): JSX.Element {
  const episode = episodeContext.useContext()
  return (
    <Card size='sm' mb='10px'>
      <CardHeader>
        <Heading size='sm'>
          Import ({episode.doc.createdAt})
        </Heading>
      </CardHeader>
      <CardBody>
        Size: {props.input.items.length}
      </CardBody>
    </Card>
  )
}
