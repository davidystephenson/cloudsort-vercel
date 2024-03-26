import axios from 'axios'
import { DeleteListBody } from './list-types'

export default async function deleteList (props: {
  body: DeleteListBody
}): Promise<void> {
  const response = await axios.delete('/api/list', { data: props.body })
  return response.data
}
