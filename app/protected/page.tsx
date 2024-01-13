'use client'
import ThemeLinkableView from '@/lib/theme/theme-linkable-view'

export default function Home (): JSX.Element {
  return (
    <>
      <h1 className='text-lg'>
        Sort your <ThemeLinkableView href='/lists'>lists</ThemeLinkableView>
      </h1>
    </>
  )
}
