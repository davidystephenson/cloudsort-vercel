import { useTaskQueue } from 'rondonjon-react-task-queue'

export interface Task<Result> {
  perform?: () => Promise<Result>
  label: string
}
interface AddMessage {
  status: 'add'
}
interface StartMessage {
  status: 'start'
}
interface CompleteMessage <Result> {
  result: Result
  status: 'complete'
}
interface ErrorMessage {
  error: Error
  status: 'error'
}
type StatusMessage <Result> = AddMessage | StartMessage | CompleteMessage<Result> | ErrorMessage
export type Message <Result> = StatusMessage<Result> & { label: string }

type TaskQueue<Result> = ReturnType<typeof useTaskQueue<Task<Result>, Result>>

export interface Queue<Result> {
  log: Array<Message<Result | undefined>>
  history: string[]
  add: (props: { task: Task<Result | undefined> }) => Promise<Result | undefined>
  taskQueue: TaskQueue<Result | undefined>
}
