import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import historyContext from './history-context'

export default function HistoryUnarchiveView (): JSX.Element {
  const history = historyContext.useContext()
  return (
    <Card size='sm' mb='10px'>
      <CardHeader>
        <Heading size='sm'>
          Unarchive ({history.episode.createdAt})
        </Heading>
      </CardHeader>
      <CardBody>
        {history.episode.mergeChoiceId}
      </CardBody>
    </Card>
  )
}
