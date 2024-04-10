import guardObject from './guard-object'

export default function guardObjectArray (props: {
  data: unknown[]
  label: string
}): object[] {
  const objects = props.data.map((element, index) => {
    const object = guardObject({ data: element })
    return object
  })

  return objects
}
