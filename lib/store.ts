import { signIn } from 'next-auth/react'
import { create } from 'zustand'
import { Store } from '@/lib/types'

const useStore = create<Store>((set) => ({
  loginError: undefined,
  loginLoading: false,
  login: async ({ email, password }: {
    email: string
    password: string
  }) => {
    set({ loginError: undefined })
    set({ loginLoading: true })
    const body = {
      redirect: false,
      email,
      password
    }
    const result = await signIn('credentials', body)
    set({ loginLoading: false })
    if (result == null) {
      const error = new Error('There is no result')
      set({ loginError: error })
      throw error
    }

    if (result.error != null) {
      const error = new Error(result.error)
      set({ loginError: error })
      throw error
    }
  },
  registerError: undefined,
  registerLoading: false,
  register: async ({ email, password }: {
    email: string
    password: string
  }) => {
    set({ registerError: undefined })
    set({ registerLoading: true })
    const body = JSON.stringify({ email, password })
    const result = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    set({ registerLoading: false })
    if (result.status !== 200) {
      const json = await result.json()
      const error = new Error(json.error)
      set({ registerError: error })
      throw error
    }
  }
}))

export default useStore
