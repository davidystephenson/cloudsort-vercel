'use client'

import { MutableRefObject, useEffect, useRef } from 'react'

export default function useWorkerRef <
  Message
> (props: {
  onMessage: (props: {
    event: MessageEvent<Message>
  }) => void
  worker: Worker
}): MutableRefObject<Worker | undefined> {
  const ref = useRef<Worker>()
  useEffect(() => {
    ref.current = props.worker
    ref.current.onmessage = function (event: MessageEvent<Message>) {
      console.log('onmessage event', event)
      props.onMessage({ event })
    }
    return () => {
      ref.current?.terminate()
    }
  }, [props.worker, props.onMessage])
  return ref
}
