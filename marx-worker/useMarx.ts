'use client'

import { useCallback } from 'react'
import { Marx, MarxHandler } from './marxTypes'
import useMarxRef from './useMarxRef'

export default function useMarx<
  Input,
  Output,
> (props: {
  onMessage: MarxHandler<Output>
  worker: Worker
}): Marx<Input> {
  const ref = useMarxRef<Output>({
    onMessage: props.onMessage,
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
