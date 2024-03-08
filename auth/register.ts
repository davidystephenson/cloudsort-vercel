import axios from 'axios'

export default async function register (props: {
  email: string
  password: string
}): Promise<void> {
  const body = JSON.stringify(props)
  await axios.post('/api/auth/register', body)
}
