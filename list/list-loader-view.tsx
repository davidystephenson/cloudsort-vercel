'use client'

import LoaderView from '@/loader/loader-view'
import ListLoadingView from './list-loading-view'

export default function ListLoaderView (): JSX.Element {
  const view = (
    <ListLoadingView>
      <LoaderView />
    </ListLoadingView>
  )
  return view
}
