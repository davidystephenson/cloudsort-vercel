import { HStack } from '@chakra-ui/react'
import { useList } from '../list/list-context'
import OptionView from './option-view'

export default function OptionsView (): JSX.Element {
  const list = useList()
  if (list.state.choice == null || list.state.choice.options.length === 0) {
    return <></>
  }
  return (
    <HStack flexWrap='wrap' justifyContent='center'>
      <OptionView
        chooseLetter='a'
        index={0}
        itemId={list.state.choice.options[0]}
        openLetter='c'
      />
      <OptionView
        chooseLetter='b'
        index={1}
        itemId={list.state.choice.options[1]}
        openLetter='v'
      />
    </HStack>
  )
}
