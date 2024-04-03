import { useCallback, useRef, useState } from 'react'
import { TaskQueue, TaskRunner, useTaskQueue } from 'rondonjon-react-task-queue'
import { Queue, Task } from './useQueueTypes'

export default function useQueue<Result> (): Queue<Result> {
  const [log, setLog] = useState<string[]>([])
  const [history, setHistory] = useState<string[]>([])

  const runner: TaskRunner<Task<Result>, Result> = useCallback(async (task) => {
    setLog((log) => {
      const message = `Starting: #${task.label}`
      return [...log, message]
    })

    const result = await task.action()
    return result
  }, [history.length])

  const currentQueue = useRef(new TaskQueue<Task<Result>, Result>(runner)).current
  const taskQueue = useTaskQueue(currentQueue)

  const add = useCallback(
    async (task: Task<Result>) => {
      setLog((log) => {
        const message = `Adding: ${task.label}`
        return [...log, message]
      })
      setHistory((history) => [...history, task.label])

      try {
        const result = await taskQueue.add(task)
        const string = String(result)
        setLog((log) => {
          const message = `Finished: ${task.label} (result: ${string})`
          return [...log, message]
        })
        return result
      } catch (error) {
        setLog((log) => {
          if (error instanceof Error) {
            const message = `Failed: ${task.label} (${error.message})`
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
