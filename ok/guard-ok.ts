import fashionPolice from '@/fashion-police/fashion-police'
import guardBoolean from '@/fashion-police/guard-boolean'
import { Ok } from './ok-types'
import guardString from '@/fashion-police/guard-string'

export default function guardOk (props: {
  label: string
  value: unknown
}): Ok {
  const guarded = fashionPolice({
    required: {
      ok: guardBoolean
    },
    optional: {
      errorMessage: guardString
    },
    label: props.label,
    value: props.value
  })
  return guarded
}
