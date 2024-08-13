import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { HStack } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

export default function ChoiceNameView (props: {
  better: boolean
  name: string
}): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current == null) {
      console.log('no ref')
      return
    }
    const range = document.createRange()
    const text = ref.current.childNodes[0]
    range.setStartBefore(text)
    range.setEndAfter(text)
    const clientRect = range.getBoundingClientRect()
    ref.current.style.width = `${clientRect.width}px`
  }, [])
  const icon = props.better
    ? <CheckIcon />
    : <SmallCloseIcon />
  const view = (
    <HStack spacing='4px'>
      {icon}
      <div ref={ref}>{props.name}</div>
    </HStack>
  )
  return view
}
