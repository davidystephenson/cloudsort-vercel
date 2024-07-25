import MoviesHeadingView from '@/movie/movies-heading-view'
import PrivateMoviesTableView from '@/movie/private-movies-table-view'
import OptionsView from '@/option/options-view'
import privateListContext from './private-list-context'
import moviesContext from '@/movie/movies-context'

export default function PrivateListConsumer (): JSX.Element {
  const privateList = privateListContext.useContext()
  return (
    <moviesContext.Provider movies={privateList.movies}>
      <MoviesHeadingView />
      <OptionsView />
      <PrivateMoviesTableView />
    </moviesContext.Provider>
  )
}
