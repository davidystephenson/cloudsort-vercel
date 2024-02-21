import { Tbody, Tr, Heading, HStack } from '@chakra-ui/react'
import ThemeTableView from '../theme/theme-table-view'
import ThemeTdView from '../theme/theme-td-view'
import { useHeading } from './heading-context'
import { ReactNode } from 'react'

export default function HeadingConsumer (props: {
  children?: ReactNode
}): JSX.Element {
  const heading = useHeading()
  return (
    <ThemeTableView>
      <Tbody>
        <Tr>
          <ThemeTdView>
            <HStack justifyContent='space-between'>
              <Heading size='lg'>{heading.label}</Heading>
              <HStack>{props.children}</HStack>
            </HStack>
          </ThemeTdView>
        </Tr>
        {heading.content}
      </Tbody>
    </ThemeTableView>
  )
}
