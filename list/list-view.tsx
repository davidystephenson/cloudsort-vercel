'use server'

import { List } from '@prisma/client'
import ListConsumer from './list-consumer'
import { ListContextProvider } from './list-context'

export default async function ListView (props: {
  currentUserId?: number
  list: List
}): Promise<JSX.Element> {
  const view = (
    <ListContextProvider
      id={props.list.id}
      name={props.list.name}
      seed={props.list.seed}
      userId={props.list.userId}
    >
      <ListConsumer
        currentUserId={props.currentUserId}
        list={props.list}
      />
    </ListContextProvider>
  )
  return view
}
