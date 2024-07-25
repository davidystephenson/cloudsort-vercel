import HeadingView from '@/heading/heading-view'
import privateListContext from '@/list/private-list-context'
import { Heading } from '@chakra-ui/react'

export default function HistoryHeadingView (): JSX.Element {
  const list = privateListContext.useContext()
  const view = (
    <HeadingView>
      <Heading size='md'>History ({list.state.history.length})</Heading>
    </HeadingView>
  )
  return view
}
