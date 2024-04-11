import guardArray from './guard-array'

export default function guardArrayType <Type> (props: {
  guard: (props: {
    label: string
    value: unknown
  }) => Type
  label: string
  value: unknown
}): Type[] {
  const array = guardArray(props)
  const stringArray: Type[] = []
  for (const element of array) {
    const typed = props.guard({ value: element, label: props.label })
    stringArray.push(typed)
  }
  return stringArray
}
