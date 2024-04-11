import axios from 'axios'
import { DeleteListBody } from './list-types'

export default async function deleteList (props: {
  body: DeleteListBody
}): Promise<void> {
  const response = await axios.post('/api/list/delete', props.body)
  return response.data
}
