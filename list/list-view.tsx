'use client'

import ListConsumer from './list-consumer'
import { ListContextProvider } from './list-context'

export default function ListView (props: {
  id: number
  name: string
  seed: string
  userId: number
}): JSX.Element {
  return (
    <ListContextProvider
      id={props.id}
      name={props.name}
      seed={props.seed}
      userId={props.userId}
    >
      <ListConsumer />
    </ListContextProvider>
  )
}
