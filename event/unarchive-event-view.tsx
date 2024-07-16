import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import historyEventContext from './history-event-context'

export default function UnarchiveEventView (): JSX.Element {
  const historyEvent = historyEventContext.useContext()
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
