import { List } from '@prisma/client'

export default function hasListAccess (props: {
  currentUserId?: number
  list: List
}): boolean {
  const currentUserOwns = props.currentUserId === props.list.userId
  if (currentUserOwns) {
    return true
  }
  if (props.list.hidden) {
    return false
  }
  return true
}
