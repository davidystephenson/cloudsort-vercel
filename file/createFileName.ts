export default function createFileName (props: {
  extension: string
  label: string
  listId: number
  listName: string
}): string {
  const now = new Date()
  const timestamp = now.toLocaleString('sv-SE')
  const name = `cloudsort-${props.label}-${props.listName}-${props.listId}-${timestamp}.${props.extension}`
  return name
}
