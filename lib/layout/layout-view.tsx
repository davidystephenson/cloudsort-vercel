import { ReactNode } from 'react'
import NavbarLayoutView from './navbar-layout-view'
import { Container } from '@chakra-ui/react'

export default async function LayoutView (props: {
  children: ReactNode
}): Promise<JSX.Element | null> {
  return (
    <Container>
      <NavbarLayoutView />
      {props.children}
    </Container>
  )
}
