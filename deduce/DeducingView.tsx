'use client'

import MultiloaderView from '@/loader/multiloader-view'
import { Badge } from '@chakra-ui/react'
import ListLoadingView from '../list/list-loading-view'

export default function DeducingView (props: {
  index: number
  length: number
}): JSX.Element {
  return (
    <ListLoadingView>
      <MultiloaderView />
      <Badge fontSize='sm' px='5px' py='2px' borderRadius='md'>
        {props.index} / {props.length}
      </Badge>
    </ListLoadingView>
  )
}
