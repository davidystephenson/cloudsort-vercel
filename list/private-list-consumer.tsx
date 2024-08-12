import PrivateMoviesTableView from '@/movie/private-movies-table-view'
import privateListContext from './private-list-context'
import moviesContext from '@/movie/movies-context'
import ListMultiloaderView from './list-multiloader-view'

export default function PrivateListConsumer (): JSX.Element {
  const privateList = privateListContext.useContext()
  if (privateList.rewindAction.active) {
    const consumer = (
      <ListMultiloaderView />
    )
    return consumer
  }
  return (
    <moviesContext.Provider movies={privateList.movies}>
      <PrivateMoviesTableView />
    </moviesContext.Provider>
  )
}
