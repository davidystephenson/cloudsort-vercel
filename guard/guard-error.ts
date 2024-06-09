import { ApiError } from 'next/dist/server/api-utils'

export default class GuardError extends ApiError {
  label: string

  constructor (props: {
    label: string
    message: string
  }) {
    super(422, props.message)
    this.label = props.label
  }
}
