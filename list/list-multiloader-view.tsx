import MultiLoaderView from '@/loader/multi-loader-view'
import ListLoaderView from './list-loader-view'

export default function ListMultiloaderView (): JSX.Element {
  const view = (
    <ListLoaderView>
      <MultiLoaderView />
    </ListLoaderView>
  )
  return view
}
