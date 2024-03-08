'use client'

import postList from '@/list/post-list'
import RequestButtonView from '../request/request-button-view'

export default function CreateListButtonView (): JSX.Element {
  async function handleClick (): Promise<void> {
    await postList({ name: 'My List' })
  }
  return (
    <RequestButtonView send={handleClick}>
      Create List
    </RequestButtonView>
  )
}
