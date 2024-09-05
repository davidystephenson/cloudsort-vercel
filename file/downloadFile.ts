import createFileName from './createFileName'

export default function downloadFile (props: {
  extension: string
  label: string
  listId: number
  listName: string
  text: string
}): void {
  const blob = new Blob([props.text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = createFileName({
    extension: props.extension,
    label: props.label,
    listId: props.listId,
    listName: props.listName
  })
  link.href = url
  link.click()
}
