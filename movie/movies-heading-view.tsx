import { Heading, HStack } from '@chakra-ui/react'
import HeadingView from '../heading/heading-view'
import MoviesHeadingContentView from './movies-heading-content-view'
import MoviesQueueView from './movies-queue-view'
import MoviesMenuView from './movies-menu-view'
import { useListContext } from '@/list/list-context'
import ChoiceCounterView from '@/choice-counter/ChoiceCounter'
import { useTable } from '@/table/table-context'

export default function MoviesHeadingView (): JSX.Element {
  const list = useListContext()
  const table = useTable()
  if (table.queried) {
    return <></>
  }
  return (
    <HeadingView content={<MoviesHeadingContentView />}>
      <HStack width='100%'>
        <Heading size='lg'>{list.name}</Heading>
        <MoviesQueueView />
        <ChoiceCounterView />
      </HStack>
      <MoviesMenuView />
    </HeadingView>
  )
}
