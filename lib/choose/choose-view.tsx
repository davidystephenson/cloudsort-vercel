import { useList } from '../list/list-context'
import SendRequestView from '../request/send-request-view'

export default function ChooseView (): JSX.Element {
  const list = useList()
  if (list.state.complete) {
    return <></>
  }
  async function chooseA (): Promise<void> {
    await list.choose({ betterIndex: 0 })
  }
  async function chooseB (): Promise<void> {
    await list.choose({ betterIndex: 1 })
  }

  return (
    <>
      <SendRequestView send={chooseA}>
        A
      </SendRequestView>
      <SendRequestView send={chooseB}>
        B
      </SendRequestView>
    </>
  )
}
