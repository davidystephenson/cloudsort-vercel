import { useCallback, useRef, useState } from 'react'
import { TaskQueue, TaskRunner, useTaskQueue } from 'rondonjon-react-task-queue'
import { Message, Queue, Task } from './useQueueTypes'

export default function useQueue<Result> (): Queue<Result> {
  const [log, setLog] = useState<Array<Message<Result | undefined>>>([])
  const [history, setHistory] = useState<string[]>([])

  const runner: TaskRunner<Task<Result | undefined>, Result | undefined> = useCallback(async (task) => {
    setLog((log) => {
      const message = {
        label: task.label,
        status: 'start'
      } as const
      return [...log, message]
    })

    const result = await task.perform?.()
    return result
  }, [history.length])

  const currentQueue = useRef(new TaskQueue<Task<Result | undefined>, Result | undefined>(runner)).current
  const taskQueue = useTaskQueue(currentQueue)

  const add = useCallback(
    async (task: Task<Result | undefined>) => {
      setLog((log) => {
        const message = {
          label: task.label,
          status: 'add'
        } as const
        return [...log, message]
      })
      setHistory((history) => [...history, task.label])

      try {
        const result = await taskQueue.add(task)
        setLog((log) => {
          const message = {
            label: task.label,
            result,
            status: 'complete'
          } as const
          return [...log, message]
        })
        return result
      } catch (error) {
        setLog((log) => {
          if (error instanceof Error) {
            const message = {
              error,
              label: task.label,
              status: 'error'
            } as const
            return [...log, message]
          }
          throw error
        })
        throw error
      }
    },
    []
  )

  return { log, history, add, taskQueue }
}
