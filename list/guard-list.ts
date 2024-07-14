import guardModel from '@/guard/guard-model'
import guardNumber from '@/guard/guard-number'
import guardString from '@/guard/guard-string'
import { List } from '@prisma/client'

export default function guardList (props: {
  label: string
  value: unknown
}): List {
  const guards = {
    id: guardNumber,
    name: guardString,
    userId: guardNumber,
    seed: guardString
  }
  const guarded = guardModel({
    guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
