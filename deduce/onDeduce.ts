import { DeduceHandlers, DeduceKey, DeduceMessages } from './deduce-types'

export default function onDeduce <Key extends DeduceKey> (props: {
  key: Key
  message: DeduceMessages[Key]
  receivers: DeduceHandlers
}): void {
  const handler = props.receivers[props.key]
  handler({ message: props.message })
}
