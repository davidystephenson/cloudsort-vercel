import ListsHeadingCreateView from './lists-heading-create-view'
import CreateListFormView from './create-list-form-view'
import HeadingView from '../heading/heading-view'

export default function ListsHeadingView (): JSX.Element {
  return (
    <HeadingView content={<CreateListFormView />} label='Lists'>
      <ListsHeadingCreateView />
    </HeadingView>
  )
}
