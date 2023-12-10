import { getServerSession } from 'next-auth/next'

export default async function AuthStatus (): Promise<JSX.Element> {
  const session = await getServerSession()
  if (session == null) {
    return (
      <p>
        Not signed in
      </p>
    )
  }
  return (
    <p>
      Signed in as {session.user?.email}
    </p>
  )
}
