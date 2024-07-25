'use client'

import { Heading, HStack } from '@chakra-ui/react'
import privateListContext from './private-list-context'

export default function ListTest (props: {
}): JSX.Element {
  const privateList = privateListContext.useContext()
  if (
    privateList.importingFlag.flag ||
    privateList.state.complete ||
    privateList.state.choice == null ||
    privateList.state.choice.options.length === 0
  ) {
    return <></>
  }
  return (
    <HStack style={{ justifyContent: 'center' }} justifyContent='center'>
      <Heading>hello</Heading>
    </HStack>
  )
}
