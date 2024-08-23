import { DeduceKey } from '@/deduce/deduce-types'
import { RewindHandlers, RewindMessages } from '@/shade/rewind-types'

export default function onRewind <Key extends DeduceKey> (props: {
  key: Key
  message: RewindMessages[Key]
  receivers: RewindHandlers
}): void {
  const handler = props.receivers[props.key]
  handler({ message: props.message })
}
