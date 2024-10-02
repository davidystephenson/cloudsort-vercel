import { Center, HStack, VStack } from '@chakra-ui/react'
import privateListContext from '../list/private-list-context'
import OptionView from './option-view'
import DeferView from '@/defer/defer-view'
import { useTable } from '@/table/table-context'

export default function OptionsView (): JSX.Element {
  const list = privateListContext.useContext()
  const table = useTable()
  if (
    table.searching ||
    list.importAction.active ||
    list.state.complete ||
    list.state.choice == null ||
    list.state.choice.options.length === 0
  ) {
    return <></>
  }
  const aId = list.state.choice.options[list.state.choice.aIndex]
  const bId = list.state.choice.options[list.state.choice.bIndex]
  return (
    <VStack>
      <HStack flexWrap='wrap' justifyContent='center' marginTop='10px'>
        <OptionView
          chooseLetter='a'
          index={list.state.choice.aIndex}
          id={aId}
          openLetter='c'
        />
        <OptionView
          chooseLetter='b'
          index={list.state.choice.bIndex}
          id={bId}
          openLetter='v'
        />
      </HStack>
      <Center>
        <DeferView />
      </Center>
    </VStack>
  )
}
