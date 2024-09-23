import { Episode, State } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { useState, useMemo, useEffect } from 'react'
import { DeduceHandlers, Deduction } from './deduce-types'
import useDeduceMarx from './useDeduceMarx'

export default function useDeduce (props: {
  history: Array<Episode<ListMovie>>
  seed: string
}): Deduction {
  const [index, setIndex] = useState(0)
  const [state, setState] = useState<State<ListMovie>>()

  const handlers = useMemo(() => {
    const handlers: DeduceHandlers = {
      episode: (episodeProps) => {
        setIndex(episodeProps.index)
      },
      state: (stateProps) => {
        setState(stateProps.state)
      }
    }
    return handlers
  }, [])
  const deduceMarx = useDeduceMarx({
    handlers
  })
  useEffect(() => {
    deduceMarx.post({
      history: props.history,
      seed: props.seed
    })
  }, [props.history, props.seed])
  const deduction = {
    index,
    state
  }
  return deduction
}
