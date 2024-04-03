import { useTaskQueue } from 'rondonjon-react-task-queue'

export interface Task <Result> {
  label: string
  action: () => Promise<Result>
}

type TaskQueue <Result> = ReturnType<typeof useTaskQueue<Task<Result>, Result>>

export interface Queue <Result> {
  log: string[]
  history: string[]
  add: (task: Task<Result>) => Promise<Result>
  taskQueue: TaskQueue<Result>
}
