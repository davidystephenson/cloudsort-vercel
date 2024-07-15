import fashionPolice from '@/fashion-police/fashion-police'
import { Ok } from './ok-types'
import guardTrue from '@/fashion-police/guard-true'

export default function guardOk (props: {
  label: string
  value: unknown
}): Ok {
  const guarded = fashionPolice({
    required: {
      ok: guardTrue
    },
    label: props.label,
    value: props.value
  })
  return guarded
}
