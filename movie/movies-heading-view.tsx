import { Heading } from '@chakra-ui/react'
import HeadingView from '../heading/heading-view'
import MoviesHeadingContentView from './movies-heading-content-view'
import MoviesQueueView from './movies-queue-view'
import MoviesMenuView from './movies-menu-view'
import { useListContext } from '@/list/list-context'
import ChoiceCounterView from '@/choice-counter/ChoiceCounter'
import TableSearchView from '@/table/table-search-view'

export default function MoviesHeadingView (): JSX.Element {
  const list = useListContext()
  return (
    <HeadingView content={<MoviesHeadingContentView />}>
      <Heading size='lg'>{list.name}</Heading>
      <MoviesQueueView />
      <ChoiceCounterView />
      <TableSearchView />
      <MoviesMenuView />
    </HeadingView>
  )
}
