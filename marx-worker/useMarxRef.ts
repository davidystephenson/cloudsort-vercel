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
  const handleRef = useRef<MarxHandler<Output>>(props.onMessage)
  useEffect(() => {
    handleRef.current = props.onMessage
  }, [props.onMessage])
  useEffect(() => {
    ref.current = props.worker
    ref.current.onmessage = function (event: MessageEvent<Output>) {
      handleRef.current({ event })
    }
    return () => {
      console.log('terminating')
      ref.current?.terminate()
    }
  }, [props.worker])
  return ref
}
