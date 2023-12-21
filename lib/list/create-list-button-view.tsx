'use client'

import postList from '@/lib/list/post-list'
import SendRequestView from '../request/send-request-view'

export default function CreateListButtonView (): JSX.Element {
  async function handleClick (): Promise<void> {
    await postList({ name: 'My List' })
  }
  return (
    <SendRequestView send={handleClick}>
      Create List
    </SendRequestView>
  )
}
