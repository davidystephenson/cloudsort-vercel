import HeadingContentView from '../heading/heading-content-view'
import { useHeading } from '../heading/heading-context'
import CreateListFormView from './create-list-form-view'

export default function ListsHeadingContentView (): JSX.Element {
  const heading = useHeading()
  if (heading.selection == null) {
    return <></>
  }
  const creating = heading.selection === 'create'
  if (creating) {
    return (
      <HeadingContentView>
        <CreateListFormView />
      </HeadingContentView>
    )
  }
  throw new Error(`Unexpected selection: ${heading.selection}`)
}
