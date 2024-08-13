import LineSpanView from '@/line/line-span-view'
import { Text } from '@chakra-ui/react'

export default function ChoiceNameView (props: {
  icon: JSX.Element
  name: string
}): JSX.Element {
  const words = props.name.split(' ')
  const [firstWord, ...restWords] = words
  const rest = restWords.join(' ')
  const view = (
    <Text>
      <LineSpanView>
        {props.icon}
        &thinsp;
        {firstWord}
      </LineSpanView>
      &thinsp;
      {rest}
    </Text>
  )
  return view
}
