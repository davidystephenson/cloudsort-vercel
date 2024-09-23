'use client'

import { useCallback } from 'react'
import { Marx } from './marxTypes'
import useMarxRef from './useMarxRef'
import marion, { Actors } from '@/marion/marion'

export default function useMarx<
  Input,
  T extends object,
  Output extends { type: keyof T } & T[keyof T],
> (props: {
  worker: Worker
  actors: Actors<T>
}): Marx<Input> {
  const handleMessage = useCallback((handleMessageProps: {
    event: MessageEvent<Output>
  }) => {
    const data = handleMessageProps.event.data
    marion(props.actors, data)
  }, [])
  const ref = useMarxRef<Output>({
    onMessage: handleMessage,
    worker: props.worker
  })
  const post = useCallback((input: Input) => {
    ref.current?.postMessage(input)
  }, [])
  const marx: Marx<Input> = {
    post,
    ref
  }
  return marx
}
