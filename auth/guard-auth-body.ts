import guardObject from '@/fashion-police/guard-object'
import { AuthBody } from './auth-types'
import guardStringProp from '@/fashion-police/guard-string-prop'

export default function guardAuthBody (props: {
  label: string
  value: unknown
}): AuthBody {
  const object = guardObject({
    label: props.label,
    value: props.value
  })
  const email = guardStringProp({
    key: 'email',
    label: 'email',
    value: object
  })
  const password = guardStringProp({
    key: 'password',
    label: 'password',
    value: object
  })
  return {
    email,
    password
  }
}
