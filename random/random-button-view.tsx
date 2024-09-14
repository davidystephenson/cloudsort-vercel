import privateListContext from '@/list/private-list-context'
import RandomIconView from './random-icon-view'
import ButtonView from '@/button/button-view'
import { HStack, Text } from '@chakra-ui/react'
import { useHotkeys } from 'react-hotkeys-hook'

export default function RandomButtonView (): JSX.Element {
  const list = privateListContext.useContext()
  function handleRandom (): void {
    if (!list.state.complete) {
      return
    }
    list.random()
  }
  useHotkeys('r', handleRandom)
  if (!list.state.complete) {
    return <></>
  }

  const view = (
    <ButtonView onClick={handleRandom} size='xs'>
      <HStack>
        <Text>[r] Random</Text>
        <RandomIconView />
      </HStack>
    </ButtonView>
  )
  return view
}
