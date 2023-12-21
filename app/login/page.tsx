import LoginFormView from '@/lib/auth/login-form-view'

export default function Login (): JSX.Element {
  return (
    <>
      <div className='text-xl'>Login</div>
      <LoginFormView />
    </>
  )
}
