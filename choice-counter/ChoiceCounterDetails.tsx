import { Text } from '@chakra-ui/react'
import privateListContext from '@/list/private-list-context'

export default function ChoiceCounterDetailsView (): JSX.Element {
  const privateList = privateListContext.useContext()
  if (privateList.state.complete) {
    return <>Your list is sorted!</>
  }
  if (privateList.randoming) {
    return (
      <>
        <Text>You have to make at least 1 choice.</Text>
        <Text>The maximum number of choices comes from the random choice.</Text>
      </>
    )
  }
  if (privateList.range.maximum === 1) {
    return <>You have 1 more choice.</>
  }
  return (
    <>
      <Text>You have at least {privateList.range.minimum} more choices.</Text>
      <Text>You have at most {privateList.range.maximum} more choices.</Text>
    </>
  )
}
