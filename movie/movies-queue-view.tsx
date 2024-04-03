import ButtonView from '@/button/button-view'
import { useList } from '@/list/list-context'
import ThemeTableView from '@/theme/theme-table-view'
import { CheckIcon, WarningIcon } from '@chakra-ui/icons'
import { Badge, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Spinner, Tbody, Td, Tr } from '@chakra-ui/react'

export default function MoviesQueueView (): JSX.Element {
  const list = useList()
  if (list.queue.log.length === 0) {
    return <></>
  }
  const rows = list.queue.log.map((event, index) => {
    if (event.status === 'add') {
      return (
        <Tr key={index}>
          <Td>
            <Badge>Added</Badge>
            {' '}
            {event.label}
          </Td>
        </Tr>
      )
    }
    if (event.status === 'start') {
      return (
        <Tr key={index}>
          <Td>
            <Badge colorScheme='blue'>Started</Badge>
            {' '}
            {event.label}
          </Td>
        </Tr>
      )
    }
    if (event.status === 'complete') {
      return (
        <Tr key={index}>
          <Td>
            <Badge colorScheme='green'>Complete</Badge>
            {' '}
            {event.label}
          </Td>
        </Tr>
      )
    }
    if (event.status === 'error') {
      return (
        <Tr key={index}>
          <Td>
            <Badge colorScheme='red'>Error</Badge>
            {event.label}
          </Td>
        </Tr>
      )
    }
    throw new Error('Unknown event')
  })
  const table = (
    <ThemeTableView size='xs'>
      <Tbody>
        {rows}
      </Tbody>
    </ThemeTableView>
  )
  if (list.queue.taskQueue.error != null) {
    return (
      <Popover>
        <PopoverTrigger>
          <ButtonView colorScheme='red'>
            <WarningIcon />
          </ButtonView>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Error</PopoverHeader>
          <PopoverBody>{table}</PopoverBody>
        </PopoverContent>
      </Popover>
    )
  }
  if (list.queue.taskQueue.currentTask == null) {
    return (
      <Popover>
        <PopoverTrigger>
          <ButtonView colorScheme='green'>
            <CheckIcon />
          </ButtonView>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Saved</PopoverHeader>
          <PopoverBody>{table}</PopoverBody>
        </PopoverContent>
      </Popover>
    )
  }
  return (
    <Popover>
      <PopoverTrigger>
        <ButtonView colorScheme='blue'>
          <Spinner />
        </ButtonView>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Loading</PopoverHeader>
        <PopoverBody>
          {table}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
