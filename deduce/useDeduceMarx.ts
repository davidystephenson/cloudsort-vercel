import { Marx } from '@/marx-worker/marxTypes'
import { DeduceHandlers, DeduceInput } from './deduce-types'
import useMarxMarion from '@/marx-worker/useMarxMarion'

const deduceWorker = new Worker(new URL('./deduce-worker.ts', import.meta.url))

export default function useDeduceMarx (props: {
  handlers: DeduceHandlers
}): Marx<DeduceInput> {
  const marx = useMarxMarion({
    actors: props.handlers,
    worker: deduceWorker
  })
  return marx
}
