import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { HStack } from '@chakra-ui/react'

export default function ChoiceNameView (props: {
  better: boolean
  name: string
}): JSX.Element {
  const icon = props.better
    ? <CheckIcon />
    : <SmallCloseIcon />
  const view = (
    <HStack spacing='4px' width='50%'>
      {icon}
      <div>{props.name}</div>
    </HStack>
  )
  return view
}
