'use client'

import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useStore from '@/lib/store'
import LoginButtonContentView from './login-button-content-view'
import AuthFormView from './auth-form-view'

export default function LoginFormView (): JSX.Element {
  const router = useRouter()
  const login = useStore((state) => state.login)
  const loginLoading = useStore((state) => state.loginLoading)

  async function authenticate ({ email, password }: {
    email: string
    password: string
  }): Promise<void> {
    try {
      await login({ email, password })
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
      <p className='text-center text-sm text-gray-600'>
        Don&apos;t have an account?{' '}
        <Link href='/register' className='font-semibold text-gray-800'>
          Sign up
        </Link>{' '}
        for free.
      </p>
    </AuthFormView>
  )
}
