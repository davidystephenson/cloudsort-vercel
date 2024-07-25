import privateListContext from '@/list/private-list-context'
import { ActionProvider } from '../action/action-context'
import ImportMoviesConsumer from './import-movies-consumer'

export default function ImportMoviesView (): JSX.Element {
  const list = privateListContext.useContext()
  return (
    <ActionProvider loading={list.importingFlag.flag}>
      <ImportMoviesConsumer />
    </ActionProvider>
  )
}
