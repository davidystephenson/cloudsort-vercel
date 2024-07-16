import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import historyEventContext from './history-event-context'

export default function ArchiveEventView (): JSX.Element {
  const historyEvent = historyEventContext.useContext()
  return (
    <Card size='sm' mb='10px'>
      <CardHeader>
        <Heading size='sm'>
          Archive ({historyEvent.event.createdAt})
        </Heading>
      </CardHeader>
      <CardBody>
        {historyEvent.event.mergeChoiceId}
      </CardBody>
    </Card>
  )
}
