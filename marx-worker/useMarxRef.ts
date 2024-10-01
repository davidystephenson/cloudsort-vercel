'use client'

import { useEffect, useRef } from 'react'
import { MarxHandler, MarxRef } from './marxTypes'

export default function useMarxRef <
  Output
> (props: {
  onMessage: MarxHandler<Output>
  worker: Worker
}): MarxRef {
  const ref = useRef<Worker>()
  useEffect(() => {
    ref.current = props.worker
    ref.current.onmessage = function (event: MessageEvent<Output>) {
      props.onMessage({ event })
    }
    return () => {
      ref.current?.terminate()
    }
  }, [props.worker, props.onMessage])
  return ref
}
