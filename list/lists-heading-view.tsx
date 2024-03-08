import ListsHeadingCreateView from './lists-heading-create-view'
import HeadingView from '../heading/heading-view'
import ListsHeadingContentView from './lists-heading-content-view'

export default function ListsHeadingView (): JSX.Element {
  return (
    <HeadingView content={<ListsHeadingContentView />} label='Lists'>
      <ListsHeadingCreateView />
    </HeadingView>
  )
}
