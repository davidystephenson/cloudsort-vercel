import MultiLoaderView from '@/loader/multi-loader-view'
import ListLoadingView from './list-loading-view'

export default function ListMultiloaderView (): JSX.Element {
  const view = (
    <ListLoadingView>
      <MultiLoaderView />
    </ListLoadingView>
  )
  return view
}
