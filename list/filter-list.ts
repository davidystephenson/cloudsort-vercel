import { List } from '@prisma/client'

export default function filterList (props: {
  row: List
  query: string
}): boolean {
  if (props.row.name.includes(props.query)) {
    return true
  }
  return false
}
