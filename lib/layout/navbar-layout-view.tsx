import ThemeSwitchView from '../theme/theme-switch-view'
import ProfileView from '../auth/profile-view'

export default async function NavbarLayoutView (): Promise<JSX.Element | null> {
  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-4xl text-primary'>Cloudsort</h1>
      <ThemeSwitchView />
      <ProfileView />
    </div>
  )
}
