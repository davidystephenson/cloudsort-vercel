'use client'

import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import useStore from '@/lib/store'
import AuthFormView from '../auth-form/auth-form-view'
import SubmitRequestView from '../request/submit-request-view'

export default function RegisterFormView (): JSX.Element {
  const router = useRouter()
  const sendRegister = useStore((state) => state.register.send)

  async function register ({
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
      send={register}
    >
      <SubmitRequestView>
        Register
      </SubmitRequestView>
    </AuthFormView>
  )
}
