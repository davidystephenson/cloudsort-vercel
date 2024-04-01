import { VStack } from '@chakra-ui/react'
import OptionChooseView from './option-choose-view'
import OptionOpenView from './option-open-view'

export default function OptionConsumer (): JSX.Element {
  return (
    <VStack>
      <OptionChooseView />
      <OptionOpenView />
    </VStack>
  )
}
