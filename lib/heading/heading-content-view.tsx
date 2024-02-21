import { Tr } from '@chakra-ui/react'
import ThemeTdView from '../theme/theme-td-view'
import { ReactNode } from 'react'

export default function HeadingContentView (props: {
  children?: ReactNode
}): JSX.Element {
  return (
    <Tr>
      <ThemeTdView>
        {props.children}
      </ThemeTdView>
    </Tr>
  )
}
