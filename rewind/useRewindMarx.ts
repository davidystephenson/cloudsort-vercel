import { Marx } from '@/marx-worker/marxTypes'
import { RewindHandlers, RewindInput } from './rewindTypes'
import useMarxMarion from '@/marx-worker/useMarxMarion'

const rewindWorker = new Worker(new URL('./rewind-worker.ts', import.meta.url))

export default function useRewindMarx (props: {
  actors: RewindHandlers
}): Marx<RewindInput> {
  const marx = useMarxMarion({
    actors: props.actors,
    worker: rewindWorker
  })
  return marx
}
