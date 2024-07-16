import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import historyContext from './history-context'

export default function HistoryChoiceView (): JSX.Element {
  const historyEpisode = historyContext.useContext()
  return (
    <Card size='sm' mb='10px'>
      <CardHeader>
        <Heading size='sm'>
          Choice ({historyEpisode.episode.createdAt})
        </Heading>
      </CardHeader>
      <CardBody>
        {historyEpisode.episode.mergeChoiceId}
      </CardBody>
    </Card>
  )
}
