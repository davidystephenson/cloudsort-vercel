import { MutableRefObject } from 'react'

export interface Marx <Input> {
  post: (input: Input) => void
  ref: MarxRef
}
export type MarxHandlers <Output, Key extends string> = {
  [key in Key]: (props: { message: Output }) => void
}
export type MarxRef = MutableRefObject<Worker | undefined>
