import { HStack, Text } from '@chakra-ui/react'
import MinimumLabelView from './MinimumLabel'
import MaximumLabelView from './MaximumLabel'
import { CheckIcon } from '@chakra-ui/icons'
import privateListContext from '@/list/private-list-context'

export default function ChoiceCounterLabelView (): JSX.Element {
  const privateList = privateListContext.useContext()
  if (privateList.state.complete) {
    return <CheckIcon />
  }
  if (privateList.range.maximum === 1) {
    return <span>1</span>
  }
  return (
    <HStack gap='3px'>
      <MinimumLabelView />
      <Text>-</Text>
      <MaximumLabelView />
      {/* <DifferenceLabelView /> */}
    </HStack>
  )
}
