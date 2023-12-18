import { signIn } from 'next-auth/react'
import { create } from 'zustand'
import { AuthProps, CreateListProps, Store } from '@/lib/types'
import { immer } from 'zustand/middleware/immer'

const useStore = create<Store>()(
  immer((set) => ({
    createList: {
      error: undefined,
      loading: false,
      send: async ({ name }: CreateListProps) => {
        set(state => {
          state.createList.error = undefined
          state.createList.loading = true
        })
        const body = JSON.stringify({ name })
        const result = await fetch('/api/list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body
        })
        console.log('result?', result)
        set(state => {
          state.register.loading = false
        })
        if (result.status !== 200) {
          const json = await result.json()
          set(state => {
            state.createList.error = new Error(json.error)
            state.createList.loading = false
          })
        }
      }
    },
    login: {
      error: undefined,
      loading: false,
      send: async ({ email, password }: AuthProps) => {
        set(state => {
          state.login.error = undefined
          state.login.loading = true
        })
        const body = {
          redirect: false,
          email,
          password
        }
        const result = await signIn('credentials', body)
        set(state => {
          state.login.loading = false
        })
        if (result == null) {
          const error = new Error('There is no result')
          set(state => {
            state.login.error = error
          })
          throw error
        }
        if (result.error != null) {
          const error = new Error(result.error)
          set(state => {
            state.login.error = error
          })
          throw error
        }
      }
    },
    register: {
      error: undefined,
      loading: false,
      send: async ({ email, password }: {
        email: string
        password: string
      }) => {
        set(state => {
          state.register.error = undefined
          state.register.loading = true
        })
        const body = JSON.stringify({ email, password })
        const result = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body
        })
        set(state => {
          state.register.loading = false
        })
        if (result.status !== 200) {
          const json = await result.json()
          const error = new Error(json.error)
          set(state => {
            state.register.error = error
          })
          throw error
        }
      }
    }
  }))
)

export default useStore
