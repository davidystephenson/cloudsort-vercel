import guardObject from './guard-object'

export default function guardObjectArray (props: {
  label: string
  value: unknown[]
}): object[] {
  const elementLabel = `${props.label} element`
  const objects = props.value.map((element, index) => {
    const object = guardObject({ label: elementLabel, value: element })
    return object
  })
  return objects
}
