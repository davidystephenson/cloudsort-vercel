import { Tbody, Heading, HStack } from '@chakra-ui/react'
import ThemeTableView from '../theme/theme-table-view'
import { useHeading } from './heading-context'
import { ReactNode } from 'react'
import HeadingContentView from './heading-content-view'

export default function HeadingConsumer (props: {
  children?: ReactNode
}): JSX.Element {
  const heading = useHeading()
  return (
    <ThemeTableView>
      <Tbody>
        <HeadingContentView>
          <HStack justifyContent='space-between'>
            <Heading size='lg'>{heading.label}</Heading>
            <HStack>{props.children}</HStack>
          </HStack>
        </HeadingContentView>
        {heading.content}
      </Tbody>
    </ThemeTableView>
  )
}
