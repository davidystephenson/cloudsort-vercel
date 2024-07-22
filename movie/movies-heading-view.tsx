import { Heading } from '@chakra-ui/react'
import HeadingView from '../heading/heading-view'
import ImportMoviesView from './import-movies-view'
import MoviesHeadingContentView from './movies-heading-content-view'
import MoviesHeadingCreateView from './movies-heading-create-view'
import MoviesQueueView from './movies-queue-view'
import { useList } from '@/list/list-context'
import RandomView from '@/random/random-view'

export default function MoviesHeadingView (): JSX.Element {
  const list = useList()
  return (
    <HeadingView content={<MoviesHeadingContentView />}>
      <Heading size='lg'>{list.row.name} ({list.movies.length})</Heading>
      <MoviesQueueView />
      <ImportMoviesView />
      <MoviesHeadingCreateView />
      <RandomView />
    </HeadingView>
  )
}
