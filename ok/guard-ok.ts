import guardModel from '@/guard/guard-model'
import { Ok } from './ok-types'
import guardTrue from '@/guard/guard-true'

export default function guardOk (props: {
  label: string
  value: unknown
}): Ok {
  const guarded = guardModel({
    guards: {
      ok: guardTrue
    },
    label: props.label,
    value: props.value
  })
  return guarded
}
