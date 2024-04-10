import guardArray from './guard-array'
import guardObjectArray from './guard-object-array'

export default function guardObjectArrayType <Type> (props: {
  data: unknown
  guard: (props: { data: object, label: string }) => Type
  label: string
}): Type[] {
  const array = guardArray({
    data: props.data,
    label: props.label
  })
  const objectArray = guardObjectArray({
    data: array,
    label: props.label
  })
  const typedArray: Type[] = []
  for (const element of objectArray) {
    const typed = props.guard({ data: element, label: props.label })
    typedArray.push(typed)
  }
  return typedArray
}
