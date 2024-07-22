import listContext from '@/list/list-context'
import { ActionProvider } from '../action/action-context'
import ImportMoviesConsumer from './import-movies-consumer'

export default function ImportMoviesView (): JSX.Element {
  const list = listContext.useContext()
  return (
    <ActionProvider loading={list.importingFlag.flag}>
      <ImportMoviesConsumer />
    </ActionProvider>
  )
}
