import PrivateMoviesTableView from '@/movie/private-movies-table-view'
import privateListContext from './private-list-context'
import moviesContext from '@/movie/movies-context'
import DeducingView from '@/deduce/DeducingView'

export default function PrivateListConsumer (): JSX.Element {
  const privateList = privateListContext.useContext()
  if (privateList.rewindAction.active) {
    if (privateList.rewindLength == null) {
      throw new Error('There is no rewind length')
    }
    return (
      <DeducingView
        index={privateList.rewindIndex}
        length={privateList.rewindLength}
      />
    )
  }
  return (
    <moviesContext.Provider movies={privateList.movies}>
      <PrivateMoviesTableView />
    </moviesContext.Provider>
  )
}
