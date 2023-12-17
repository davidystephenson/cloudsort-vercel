'use client'

import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useStore from '@/lib/store'
import LoginButtonContentView from './login-button-content-view'
import AuthFormView from './auth-form-view'

export default function LoginFormView (): JSX.Element {
  const router = useRouter()
  const sendLogin = useStore((state) => state.login.send)
  const loginLoading = useStore((state) => state.login.loading)

  async function authenticate ({ email, password }: {
    email: string
    password: string
  }): Promise<void> {
    try {
      await sendLogin({ email, password })
      router.refresh()
      router.push('/protected')
    } catch (error) {
      const e = error as Error
      toast.error(e.message)
    }
  }

  return (
    <AuthFormView
      authenticate={authenticate}
      buttonContent={<LoginButtonContentView />}
      loading={loginLoading}
    >
      <div>
        <Link href='/register'>
          Sign up
        </Link>
      </div>
    </AuthFormView>
  )
}
