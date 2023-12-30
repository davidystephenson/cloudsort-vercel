'use client'

import ProfileView from '../auth/profile-view'
import ThemeLinkView from '../theme/theme-link-view'

export default function NavbarLayoutView (): JSX.Element {
  return (
    <div className='flex items-center justify-between'>
      <ThemeLinkView
        className='text-4xl'
        href='/lists'
        underline='none'
      >
        Cloudsort
      </ThemeLinkView>
      <ProfileView />
    </div>
  )
}
