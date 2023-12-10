'use client'

import LoadingDots from 'views/loading-dots'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useStore from '@/lib/store'

export default function Form ({
  type
}: {
  type: 'login' | 'register'
}): JSX.Element {
  const router = useRouter()
  const login = useStore((state) => state.login)
  const loginLoading = useStore((state) => state.loginLoading)
  const register = useStore((state) => state.register)
  const registerLoading = useStore((state) => state.registerLoading)

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if (type === 'login') {
      try {
        await login({ email: e.currentTarget.email.value, password: e.currentTarget.password.value })
        router.refresh()
        router.push('/protected')
      } catch (error) {
        const e = error as Error
        toast.error(e.message)
      }
    } else {
      try {
        await register({ email: e.currentTarget.email.value, password: e.currentTarget.password.value })
        toast.success('Account created! Redirecting to login...')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } catch (error) {
        const e = error as Error
        toast.error(e.message)
      }
    }
  }

  const loading = type === 'login' ? loginLoading : registerLoading

  return (
    <form
      onSubmit={(e) => { void handleSubmit(e) }}
      className='flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16'
    >
      <div>
        <label
          htmlFor='email'
          className='block text-xs text-gray-600 uppercase'
        >
          Email Address
        </label>
        <input
          id='email'
          name='email'
          type='email'
          placeholder='panic@thedis.co'
          autoComplete='email'
          required
          className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
        />
      </div>
      <div>
        <label
          htmlFor='password'
          className='block text-xs text-gray-600 uppercase'
        >
          Password
        </label>
        <input
          id='password'
          name='password'
          type='password'
          required
          className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
        />
      </div>
      <button
        disabled={loading}
        className={`${loading
            ? 'cursor-not-allowed border-gray-200 bg-gray-100'
            : 'border-black bg-black text-white hover:bg-white hover:text-black'
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading
          ? (
            <LoadingDots color='#808080' />
            )
          : (
            <p>{type === 'login' ? 'Sign In' : 'Sign Up'}</p>
            )}
      </button>
      {type === 'login'
        ? (
          <p className='text-center text-sm text-gray-600'>
            Don&apos;t have an account?{' '}
            <Link href='/register' className='font-semibold text-gray-800'>
              Sign up
            </Link>{' '}
            for free.
          </p>
          )
        : (
          <p className='text-center text-sm text-gray-600'>
            Already have an account?{' '}
            <Link href='/login' className='font-semibold text-gray-800'>
              Sign in
            </Link>{' '}
            instead.
          </p>
          )}
    </form>
  )
}
