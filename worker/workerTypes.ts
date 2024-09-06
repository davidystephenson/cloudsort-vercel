import { MutableRefObject } from 'react'

export interface UsedWorker {
  ref: MutableRefObject<Worker | undefined>
}
