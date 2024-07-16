import HeadingView from '@/heading/heading-view'
import listContext from '@/list/list-context'
import { Heading } from '@chakra-ui/react'

export default function HistoryHeadingView (): JSX.Element {
  const list = listContext.useContext()
  const view = (
    <HeadingView>
      <Heading size='md'>History ({list.state.history.length})</Heading>
    </HeadingView>
  )
  return view
}
