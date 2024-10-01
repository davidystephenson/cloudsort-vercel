import { useTaskQueue } from 'rondonjon-react-task-queue'

export type AddTask <Result = unknown> = (task: Task<Result | undefined>) => Promise<Result | undefined>
export interface AddMessage {
  status: 'add'
}
export interface CompleteMessage <Result> {
  result: Result
  status: 'complete'
}
export interface ErrorMessage {
  error: Error
  status: 'error'
}
export type Message <Result> = StatusMessage<Result> & { label: string }
export interface Queue<Result> {
  log: Array<Message<Result | undefined>>
  history: string[]
  add: AddTask<Result>
  taskQueue: TaskQueue<Result | undefined>
}
export interface StartMessage {
  status: 'start'
}

export type StatusMessage <Result> = AddMessage | StartMessage | CompleteMessage<Result> | ErrorMessage
export interface Task<Result> {
  perform?: () => Promise<Result>
  label: string
}
export type TaskQueue<Result> = ReturnType<
  typeof useTaskQueue<Task<Result>, Result>
>
