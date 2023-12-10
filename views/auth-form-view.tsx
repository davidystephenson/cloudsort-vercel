export default function AuthFormView ({
  authenticate,
  buttonContent,
  children,
  loading
}: {
  authenticate: ({ email, password }: { email: string, password: string }) => Promise<void>
  buttonContent: JSX.Element
  children: React.ReactNode
  loading: boolean
}): JSX.Element {
  function handleSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    void authenticate({ email: e.currentTarget.email.value, password: e.currentTarget.password.value })
  }

  return (
    <form
      onSubmit={handleSubmit}
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
      {children}
      <button
        disabled={loading}
        className={`${loading
            ? 'cursor-not-allowed border-gray-200 bg-gray-100'
            : 'border-black bg-black text-white hover:bg-white hover:text-black'
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {buttonContent}
      </button>
    </form>
  )
}
