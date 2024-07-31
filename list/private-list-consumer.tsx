import PrivateMoviesTableView from '@/movie/private-movies-table-view'
import privateListContext from './private-list-context'
import moviesContext from '@/movie/movies-context'

export default function PrivateListConsumer (): JSX.Element {
  const privateList = privateListContext.useContext()
  return (
    <moviesContext.Provider movies={privateList.movies}>
      <PrivateMoviesTableView />
    </moviesContext.Provider>
  )
}
