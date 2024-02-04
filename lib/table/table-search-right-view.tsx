import { MdClear } from 'react-icons/md'
import ThemeIconButtonView from '../theme/theme-icon-button-view'
import { useTable } from './table-context'

export default function TableSearchRightView (): JSX.Element {
  const table = useTable()
  const empty = table.query === ''
  if (empty) {
    return <></>
  }
  function handleClick (): void {
    table.clearQuery()
  }
  return (
    <ThemeIconButtonView
      aria-label='Clear search'
      onClick={handleClick}
      variant='light'
      icon={<MdClear />}
    />
  )
}
