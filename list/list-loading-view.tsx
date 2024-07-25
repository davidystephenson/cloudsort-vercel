import { Tr, HStack, Spinner, Table, Td } from '@chakra-ui/react'
import { useListContext } from './list-context'

export default function ListLoadingView (): JSX.Element {
  const list = useListContext()
  return (
    <Table>
      <Tr>
        <Td>
          <HStack>
            {list.name}
            <Spinner />
          </HStack>
        </Td>
      </Tr>
    </Table>
  )
}
