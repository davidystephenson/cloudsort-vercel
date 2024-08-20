import fashionPolice from '@/fashion-police/fashion-police'
import guardBoolean from '@/fashion-police/guard-boolean'
import guardNumber from '@/fashion-police/guard-number'
import guardString from '@/fashion-police/guard-string'
import { List } from '@prisma/client'

export default function guardList (props: {
  label: string
  value: unknown
}): List {
  const guards = {
    hidden: guardBoolean,
    id: guardNumber,
    name: guardString,
    userId: guardNumber,
    seed: guardString,
    snapshot: guardString
  }
  const guarded = fashionPolice({
    required: guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
