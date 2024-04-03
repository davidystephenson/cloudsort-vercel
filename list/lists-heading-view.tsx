import ListsHeadingCreateView from './lists-heading-create-view'
import HeadingView from '../heading/heading-view'
import ListsHeadingContentView from './lists-heading-content-view'
import { Heading } from '@chakra-ui/react'

export default function ListsHeadingView (): JSX.Element {
  return (
    <HeadingView content={<ListsHeadingContentView />} zIndex={4} position='relative'>
      <Heading size='lg'>Lists</Heading>
      <ListsHeadingCreateView />
    </HeadingView>
  )
}
