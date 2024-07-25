import { useAuthContext } from './auth-context'

export default function ProfileLabel (): JSX.Element {
  const auth = useAuthContext()
  if (auth.session == null) {
    return <></>
  }
  return (
    <>{auth.session.user?.email}</>
  )
}
