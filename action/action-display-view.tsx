import ButtonView from '@/button/button-view'
import { HStack, Icon, Text } from '@chakra-ui/react'
import { BsCloudUpload } from 'react-icons/bs'
import { Action } from './action-types'

export default function ActionDisplayView (props: {
  action: Action
}): JSX.Element {
  const waiting = !props.action.active && props.action.errorMessage == null
  if (waiting) {
    return <></>
  }
  return (
    <>
      <ButtonView
        isDisabled
        errorMessage={props.action.errorMessage}
        loading={props.action.active}
        loadingText='Importing...'
        fontSize='sm'
        size='xs'
        variant='solid'
      >
        <HStack>
          <Icon as={BsCloudUpload} />
          <Text>Importing...</Text>
        </HStack>
      </ButtonView>
    </>
  )
}
