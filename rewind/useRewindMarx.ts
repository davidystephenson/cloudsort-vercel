import { Marx } from '@/use-marx/marxTypes'
import useMarx from '@/use-marx/useMarx'
import { RewindHandlers, RewindInput } from './rewindTypes'

const rewindWorker = new Worker(new URL('./rewind-worker.ts', import.meta.url))

export default function useRewindMarx (props: {
  actors: RewindHandlers
}): Marx<RewindInput> {
  const marx = useMarx({
    actors: props.actors,
    worker: rewindWorker
  })
  return marx
}
