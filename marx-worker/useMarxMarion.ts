'use client'

import { useCallback } from 'react'
import { Marx } from './marxTypes'
import marion, { Actors, MarionInput } from '@/marion/marion'
import useMarx from './useMarx'

export default function useMarxMarion<
  Input,
  I extends object,
  O extends { [K in keyof I]: O[K] },
  K extends keyof I & keyof O
> (props: {
  worker: Worker
  actors: Actors<I, O, K>
}): Marx<Input> {
  const handleMessage = useCallback((handleMessageProps: {
    event: MessageEvent<MarionInput<I, O, K>>
  }) => {
    const data = handleMessageProps.event.data
    marion(props.actors, data)
  }, [])
  const ref = useMarx({
    onMessage: handleMessage,
    worker: props.worker
  })
  return ref
}