import SignOutView from 'views/sign-out-view'

export default function Home (): JSX.Element {
  return (
    <div className='flex h-screen bg-black'>
      <div className='w-screen h-screen flex flex-col space-y-5 justify-center items-center'>
        <SignOutView />
      </div>
    </div>
  )
}
