import { HStack } from '@chakra-ui/react'
import { useList } from '../list/list-context'
import OptionView from './option-view'

export default function OptionsView (): JSX.Element {
  const list = useList()
  console.log('list.state', list.state)
  if (list.state.complete) {
    return <></>
  }
  if (list.state.choice == null) {
    throw new Error('There is no choice')
  }
  return (
    <HStack flexWrap='wrap' justifyContent='center'>
      <OptionView
        letter='A'
        index={0}
        id={list.state.choice.options[0]}
      />
      <OptionView
        letter='B'
        index={1}
        id={list.state.choice.options[1]}
      />
    </HStack>
  )
}
