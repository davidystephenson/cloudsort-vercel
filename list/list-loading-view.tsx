import LoaderView from '@/loader/loader-view'
import MultiLoaderView from '@/loader/multi-loader-view'
import { useTheme } from '@/theme/theme-context'
import ListLoaderView from './list-loader-view'

export default function ListLoadingView <Data> (props: {
  data: Data
  View: (props: { data: NonNullable<Data> }) => JSX.Element
}): JSX.Element {
  const theme = useTheme()
  if (!theme.mounted) {
    const view = (
      <ListLoaderView>
        <MultiLoaderView />
      </ListLoaderView>
    )
    return view
  }
  if (props.data == null) {
    const view = (
      <ListLoaderView>
        <LoaderView />
      </ListLoaderView>
    )
    return view
  }
  const view = <props.View data={props.data} />
  return view
}
