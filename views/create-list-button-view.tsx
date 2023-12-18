'use client'

import { ButtonContextProvider } from '@/lib/button/button-context'
import ButtonLoadingView from '@/lib/button/button-loading-view'
import postList from '@/lib/list/post-list'

export default function CreateListButtonView (): JSX.Element {
  function handleClick (): void {
    void postList({ name: 'My List' })
  }
  return (
    <ButtonContextProvider>
      <button
        onClick={handleClick}
        className='btn btn-primary'
      >
        <ButtonLoadingView />

        Create List
      </button>
    </ButtonContextProvider>
  )
}
