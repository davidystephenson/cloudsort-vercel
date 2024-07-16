import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import historyEventContext from './history-event-context'

export default function HistoryEventView (): JSX.Element {
  const historyEvent = historyEventContext.useContext()
  console.log('historyEvent', historyEvent)
  return (
    <Card size='sm' mb='10px'>
      <CardHeader>
        <Heading size='sm'>
          {historyEvent.event.createdAt}
        </Heading>
      </CardHeader>
      <CardBody>
        {historyEvent.event.mergeChoiceId}
      </CardBody>
    </Card>
  )
}
