import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import episodeContext from './episode-context'

export default function RemoveEpisodeView (): JSX.Element {
  const episode = episodeContext.useContext()
  return (
    <Card size='sm' mb='10px'>
      <CardHeader>
        <Heading size='sm'>
          Remove ({episode.doc.createdAt})
        </Heading>
      </CardHeader>
      <CardBody>
        {episode.doc.mergeChoiceId}
      </CardBody>
    </Card>
  )
}
