import { SignInResponse, signIn as nextAuthSignIn } from 'next-auth/react'

export default async function login ({ email, password }: {
  email: string
  password: string
}): Promise<SignInResponse | undefined> {
  const body = {
    redirect: false,
    email,
    password
  }
  console.log('body', body)
  const result = await nextAuthSignIn('credentials', body)
  console.log('result', result)
  if (result == null) {
    throw new Error('There is no result')
  }
  if (result.status !== 200) {
    if (result.error == null) {
      throw new Error('There is no login error')
    }
    throw new Error(result.error)
  }
  return result
}
