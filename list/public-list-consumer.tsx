import HeadingView from '@/heading/heading-view'
import { useListContext } from './list-context'
import PublicMoviesTableView from '@/movie/public-movies-tablie-view'

export default function PublicListConsumer (): JSX.Element {
  const list = useListContext()
  const consumer = (
    <>
      <HeadingView>
        {list.name}
      </HeadingView>
      <PublicMoviesTableView />
    </>
  )
  return consumer
}
