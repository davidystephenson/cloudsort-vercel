import PrivateMoviesTableView from '@/movie/private-movies-table-view'
import privateListContext from './private-list-context'
import moviesContext from '@/movie/movies-context'
import DeducingView from '@/deduce/DeducingView'

export default function PrivateListConsumer (): JSX.Element {
  const privateList = privateListContext.useContext()
  if (privateList.rewind.action.active) {
    if (privateList.rewind.length == null) {
      throw new Error('There is no rewind length')
    }
    return (
      <DeducingView
        index={privateList.rewind.index}
        length={privateList.rewind.length}
      />
    )
  }
  return (
    <moviesContext.Provider movies={privateList.movies} sifter={privateList.moviesSifter}>
      <PrivateMoviesTableView />
    </moviesContext.Provider>
  )
}
