'use client'

import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useStore from '@/lib/store'
import AuthFormView from './auth-form-view'
import RegisterButtonContentView from './register-button-content-view'

export default function RegisterFormView (): JSX.Element {
  const router = useRouter()
  const sendRegister = useStore((state) => state.register.send)
  const registerLoading = useStore((state) => state.register.loading)

  async function authenticate ({
    email, password
  }: {
    email: string
    password: string
  }): Promise<void> {
    try {
      await sendRegister({ email, password })
      router.refresh()
      router.push('/protected')
    } catch (error) {
      const e = error as Error
      toast.error(e.message)
    }
  }

  return (
    <AuthFormView
      loading={registerLoading}
      authenticate={authenticate}
      buttonContent={<RegisterButtonContentView />}
    >
      <p className='text-center text-sm text-gray-600'>
        Already have an account?{' '}
        <Link href='/login' className='font-semibold text-gray-800'>
          Sign in
        </Link>{' '}
        instead.
      </p>
    </AuthFormView>
  )
}
