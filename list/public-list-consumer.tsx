import PublicMoviesTableView from '@/movie/public-movies-table-view'
import publicListContext from './public-list-context'
import moviesContext from '@/movie/movies-context'

export default function PublicListConsumer (): JSX.Element {
  const publicList = publicListContext.useContext()
  const consumer = (
    <moviesContext.Provider movies={publicList.listing}>
      <PublicMoviesTableView />
    </moviesContext.Provider>
  )
  return consumer
}
