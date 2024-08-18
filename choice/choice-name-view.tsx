import useTextSlim from '@/text-slim/useTextSlim'
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { HStack } from '@chakra-ui/react'

export default function ChoiceNameView (props: {
  better: boolean
  name: string
}): JSX.Element {
  const ref = useTextSlim<HTMLDivElement>()
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
