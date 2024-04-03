import { useTaskQueue } from 'rondonjon-react-task-queue'

export interface Task<Result> {
  action: () => Promise<Result>
  label: string
}
interface AddMessage {
  error?: undefined
  result?: undefined
  status: 'add'
}
interface StartMessage {
  error?: undefined
  result?: undefined
  status: 'start'
}
interface CompleteMessage <Result> {
  error?: undefined
  result: Result
  status: 'complete'
}
interface ErrorMessage {
  error: Error
  result?: undefined
  status: 'error'
}
type StatusMessage <Result> = AddMessage | StartMessage | CompleteMessage<Result> | ErrorMessage
export type Message <Result> = StatusMessage<Result> & { label: string }

type TaskQueue<Result> = ReturnType<typeof useTaskQueue<Task<Result>, Result>>

export interface Queue<Result> {
  log: Array<Message<Result>>
  history: string[]
  add: (task: Task<Result>) => Promise<Result>
  taskQueue: TaskQueue<Result>
}
