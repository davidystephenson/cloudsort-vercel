import guardArray from './guard-array'

export default function guardArrayType <Type> (props: {
  data: unknown
  guard: (props: { data: unknown, label: string }) => Type
  label: string
}): Type[] {
  const array = guardArray(props)
  const stringArray: Type[] = []
  for (const element of array) {
    const typed = props.guard({ data: element, label: props.label })
    stringArray.push(typed)
  }
  return stringArray
}
