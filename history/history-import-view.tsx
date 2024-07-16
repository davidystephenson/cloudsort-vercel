import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import historyContext from './history-context'
import { HistoryImportData } from '@/mergeChoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export default function HistoryImportView (props: {
  input: HistoryImportData<ListMovie>
}): JSX.Element {
  const historyEvent = historyContext.useContext()
  return (
    <Card size='sm' mb='10px'>
      <CardHeader>
        <Heading size='sm'>
          Import ({historyEvent.event.createdAt})
        </Heading>
      </CardHeader>
      <CardBody>
        Size: {props.input.items.length}
      </CardBody>
    </Card>
  )
}
