import HeadingView from '@/heading/heading-view'
import { useListContext } from './list-context'
import PublicMoviesTableView from '@/movie/public-movies-tablie-view'
import publicListContext from './public-list-context'
import moviesContext from '@/movie/movies-context'

export default function PublicListConsumer (): JSX.Element {
  const list = useListContext()
  const publicList = publicListContext.useContext()
  const consumer = (
    <moviesContext.Provider movies={publicList.listing}>
      <HeadingView>
        {list.name}
      </HeadingView>
      <PublicMoviesTableView />
    </moviesContext.Provider>
  )
  return consumer
}
