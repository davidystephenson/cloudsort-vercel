export default function getNumberKeys (props: {
  object: Record<string, unknown>
}): number[] {
  const keys: number[] = []
  for (const activeId in props.object) {
    const number = Number(activeId)
    keys.push(number)
  }
  return keys
}
