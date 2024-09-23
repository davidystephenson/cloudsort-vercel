import { Marx } from '@/use-marx/marxTypes'
import useMarx from '@/use-marx/useMarx'
import { DeduceHandlers, DeduceInput } from './deduce-types'

const deduceWorker = new Worker(new URL('../deduce/deduce-worker.ts', import.meta.url))

export default function useDeduceMarx (props: {
  handlers: DeduceHandlers
}): Marx<DeduceInput> {
  const marx = useMarx({
    actors: props.handlers,
    worker: deduceWorker
  })
  return marx
}
