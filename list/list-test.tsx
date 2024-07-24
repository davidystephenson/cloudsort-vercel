'use client'

import { Heading, HStack } from '@chakra-ui/react'
import { useList } from './list-context'

export default function ListTest (props: {
}): JSX.Element {
  const list = useList()
  if (
    list.importingFlag.flag ||
    list.state.complete ||
    list.state.choice == null ||
    list.state.choice.options.length === 0
  ) {
    return <></>
  }
  return (
    <HStack style={{ justifyContent: 'center' }} justifyContent='center'>
      <Heading>hello</Heading>
    </HStack>
  )
}
