import axios from 'axios'

export default async function deleteList (props: {
  id: number
}): Promise<void> {
  const body = { id: props.id }
  const response = await axios.delete('/api/list', { data: body })
  return response.data
}
