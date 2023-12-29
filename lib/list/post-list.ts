import { List } from '@prisma/client'
import axios from 'axios'

export default async function postList (props: {
  name: string
}): Promise<List> {
  const body = { name: props.name }
  const response = await axios.post('/api/list', body)
  return response.data
}
