import ButtonView from '@/button/button-view'
import IconButtonView from '@/button/icon-button-view'
import privateListContext from '@/list/private-list-context'
import ThemeTableView from '@/theme/theme-table-view'
import { CheckIcon, WarningIcon } from '@chakra-ui/icons'
import { Badge, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Spinner, Tbody, Td, Tr } from '@chakra-ui/react'

export default function MoviesQueueView (): JSX.Element {
  const list = privateListContext.useContext()
  if (list.queue.log.length === 0) {
    return <></>
  }
  const rows = list.queue.log.map((logItem, index) => {
    if (logItem.status === 'add') {
      return (
        <Tr key={index}>
          <Td>
            <Badge>Added</Badge>
            {' '}
            {logItem.label}
          </Td>
        </Tr>
      )
    }
    if (logItem.status === 'start') {
      return (
        <Tr key={index}>
          <Td>
            <Badge colorScheme='blue'>Started</Badge>
            {' '}
            {logItem.label}
          </Td>
        </Tr>
      )
    }
    if (logItem.status === 'complete') {
      return (
        <Tr key={index}>
          <Td>
            <Badge colorScheme='green'>Complete</Badge>
            {' '}
            {logItem.label}
          </Td>
        </Tr>
      )
    }
    if (logItem.status === 'error') {
      return (
        <Tr key={index}>
          <Td>
            <Badge colorScheme='red'>Error</Badge>
            {logItem.label}
          </Td>
        </Tr>
      )
    }
    throw new Error('Unknown logItem')
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
          <ButtonView colorScheme='red' size='xs'>
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
  if (list.synced) {
    return (
      <Popover>
        <PopoverTrigger>
          <IconButtonView
            aria-label='Saved'
            icon={<CheckIcon />}
            colorScheme='green'
            size='xs'
            variant='solid'
          />
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
        <ButtonView colorScheme='blue' size='xs'>
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
