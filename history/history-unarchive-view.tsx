import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import historyContext from './history-context'

export default function HistoryUnarchiveView (): JSX.Element {
  const historyEvent = historyContext.useContext()
  return (
    <Card size='sm' mb='10px'>
      <CardHeader>
        <Heading size='sm'>
          Unarchive ({historyEvent.event.createdAt})
        </Heading>
      </CardHeader>
      <CardBody>
        {historyEvent.event.mergeChoiceId}
      </CardBody>
    </Card>
  )
}