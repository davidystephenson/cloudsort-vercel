import guardArray from './guard-array'
import guardObjectArray from './guard-object-array'

export default function guardObjectArrayType <Type> (props: {
  guard: (props: {
    label: string
    value: object
  }) => Type
  label: string
  value: unknown
}): Type[] {
  const array = guardArray({
    value: props.value,
    label: props.label
  })
  const objectArray = guardObjectArray({
    value: array,
    label: props.label
  })
  const typedArray: Type[] = []
  for (const element of objectArray) {
    const typed = props.guard({ value: element, label: props.label })
    typedArray.push(typed)
  }
  return typedArray
}
