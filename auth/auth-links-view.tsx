import ThemeLinkView from '@/theme/theme-link-view'
import { HStack } from '@chakra-ui/react'
import { useAuthContext } from './auth-context'

export default function AuthLinksView (): JSX.Element {
  const auth = useAuthContext()
  if (auth.session != null) {
    return <></>
  }
  return (
    <HStack>
      <ThemeLinkView href='/login'>Login</ThemeLinkView>
      <ThemeLinkView href='/register'>Register</ThemeLinkView>
    </HStack>
  )
}
