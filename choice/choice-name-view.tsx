import { HStack, Text } from '@chakra-ui/react'

export default function ChoiceNameView (props: {
  icon: JSX.Element
  name: string
}): JSX.Element {
  const view = (
    <HStack>{props.icon} <Text>{props.name}</Text></HStack>
  )
  return view
}
