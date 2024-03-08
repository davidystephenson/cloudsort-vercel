import { MdDeleteForever } from 'react-icons/md'
import RequestIconButtonView from '../request/request-icon-button-view'

export default function DeleteIconButtonView (props: {
  send: () => Promise<void>
}): JSX.Element {
  return (
    <RequestIconButtonView
      aria-label='Delete'
      icon={<MdDeleteForever />}
      send={props.send}
      variant='light'
      orientation='vertical'
    />
  )
}
