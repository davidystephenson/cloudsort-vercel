import fashionPolice from '@/fashion-police/fashion-police'
import { OkTrue } from './ok-types'
import guardTrue from '@/fashion-police/guard-true'

export default function guardOkTrue (props: {
  label: string
  value: unknown
}): OkTrue {
  const guarded = fashionPolice({
    required: {
      ok: guardTrue
    },
    label: props.label,
    value: props.value
  })
  return guarded
}
