import { Heading } from '@chakra-ui/react'
import HeadingView from '../heading/heading-view'
import ImportDisplayView from '../import/import-display-view'
import MoviesHeadingContentView from './movies-heading-content-view'
import MoviesHeadingCreateView from './movies-heading-create-view'
import MoviesQueueView from './movies-queue-view'
import RandomView from '@/random/random-view'
import MoviesMenuView from './movies-menu-view'
import { useListContext } from '@/list/list-context'
import ChoiceCounterView from '@/choice-counter/ChoiceCounter'

export default function MoviesHeadingView (): JSX.Element {
  const list = useListContext()
  return (
    <HeadingView content={<MoviesHeadingContentView />}>
      <Heading size='lg'>{list.name}</Heading>
      <MoviesQueueView />
      <ChoiceCounterView />
      <ImportDisplayView />
      <MoviesHeadingCreateView />
      <RandomView />
      <MoviesMenuView />
    </HeadingView>
  )
}
