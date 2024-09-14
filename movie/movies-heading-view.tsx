import ChoiceCounterView from '@/choice-counter/ChoiceCounter'
import { useListContext } from '@/list/list-context'
import { useTable } from '@/table/table-context'
import { Heading, HStack } from '@chakra-ui/react'
import HeadingView from '../heading/heading-view'
import MoviesHeadingContentView from './movies-heading-content-view'
import MoviesMenuView from './movies-menu-view'
import MoviesQueueView from './movies-queue-view'
import RandomButtonView from '@/random/random-button-view'

export default function MoviesHeadingView (): JSX.Element {
  const list = useListContext()
  const table = useTable()
  if (table.searching) {
    return <></>
  }
  return (
    <HeadingView content={<MoviesHeadingContentView />}>
      <HStack width='100%'>
        <Heading size='lg'>{list.name}</Heading>
        <MoviesQueueView />
        <ChoiceCounterView />
        <RandomButtonView />
      </HStack>
      <MoviesMenuView />
    </HeadingView>
  )
}
