import { Heading } from '@chakra-ui/react'
import HistoryEventsView from './history-events-view'

export default function HistoryView (): JSX.Element {
  return (
    <>
      <Heading size='md'>History</Heading>
      <HistoryEventsView />
    </>
  )
}
