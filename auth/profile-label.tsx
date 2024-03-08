import { useAuth } from './auth-context'

export default function ProfileLabel (): JSX.Element {
  const auth = useAuth()
  if (auth.session == null) {
    return <></>
  }
  return (
    <>{auth.session.user?.email}</>
  )
}
