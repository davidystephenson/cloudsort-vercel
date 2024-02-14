import { ActionProvider } from '../action/action-context'
import ImportMoviesConsumer from './import-movies-consumer'

export default function ImportMoviesView (): JSX.Element {
  return (
    <ActionProvider>
      <ImportMoviesConsumer />
    </ActionProvider>
  )
}
