import MultiloaderView from '@/loader/multiloader-view'
import ListLoadingView from './list-loading-view'

export default function ListMultiloaderView (): JSX.Element {
  const view = (
    <ListLoadingView>
      <MultiloaderView />
    </ListLoadingView>
  )
  return view
}
