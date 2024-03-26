import { Tbody, Heading, HStack, TableProps } from '@chakra-ui/react'
import ThemeTableView from '../theme/theme-table-view'
import { useHeading } from './heading-context'
import { ReactNode } from 'react'
import HeadingContentView from './heading-content-view'

export default function HeadingConsumer (props: {
  children?: ReactNode
} & TableProps): JSX.Element {
  const heading = useHeading()
  const { children, ...restProps } = props
  return (
    <ThemeTableView {...restProps}>
      <Tbody>
        <HeadingContentView>
          <HStack justifyContent='space-between'>
            <Heading size='lg'>{heading.label}</Heading>
            <HStack>{children}</HStack>
          </HStack>
        </HeadingContentView>
        {heading.content}
      </Tbody>
    </ThemeTableView>
  )
}
