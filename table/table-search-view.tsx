import ThemeInputView from '../theme/theme-input-view'
import { useTable } from './table-context'
import TableSearchRightView from './table-search-right-view'

export default function TableSearchView (): JSX.Element {
  const table = useTable()
  const view = (
    <ThemeInputView
      autoFocus={table.autoFocus}
      onBlur={table.handleBlur}
      onFocus={table.handleFocus}
      onChange={table.handleQueryChange}
      onKeyDown={table.handleKeyDown}
      placeholder='Search'
      ref={table.inputRef}
      rightElement={<TableSearchRightView />}
      size='sm'
      value={table.query}
    />
  )
  return view
}
