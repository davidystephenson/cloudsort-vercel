import useMarx from '@/marx-worker/useMarx'
import { Choice } from './choiceTypes'
import useAction from '@/action/use-action'
import { useCallback } from 'react'
import { ListState } from '@/list/list-types'
import { OptionChoice } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { Queue } from '@/useQueue/useQueueTypes'
import createMovieChoiceRequest from '@/movie/create-movie-choice-request'
import postChoice from './post-choice'

const choiceWorker = new Worker(new URL('./choice-worker.ts', import.meta.url))

export default function useChoice (props: {
  listId: number
  onChoose: (props: { state: ListState }) => void
  queue: Queue<unknown>
  state: ListState
}): Choice {
  const action = useAction()
  const handleMessage = useCallback((handleMessageProps: {
    event: MessageEvent<ListState>
  }) => {
    props.onChoose({ state: handleMessageProps.event.data })
    action.succeed()
  }, [action.succeed])
  const marx = useMarx<OptionChoice<ListMovie>, ListState>({
    onMessage: handleMessage,
    worker: choiceWorker
  })
  const choose = useCallback((chooseProps: {
    betterIndex: number
  }) => {
    action.start()
    marx.post({
      betterIndex: chooseProps.betterIndex,
      state: props.state
    })
    const request = createMovieChoiceRequest({
      betterIndex: chooseProps.betterIndex,
      listId: props.listId,
      state: props.state
    })
    async function perform (): Promise<void> {
      await postChoice({ request, label: request.label })
    }
    void props.queue.add({ label: request.label, perform })
  }, [action.start, marx.post, props.listId, props.queue.add, props.state])

  const choice: Choice = {
    action,
    choose,
    marx
  }
  return choice
}
