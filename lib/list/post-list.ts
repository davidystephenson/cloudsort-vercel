import axios from 'axios'

export default async function postList ({ name }: { name: string }): Promise<void> {
  const body = { name }
  const response = await axios.post('/api/list', body)
  return response.data
}
