import ThemeInputView from '../theme/theme-input-view'
import { useTable } from './table-context'
import TableSearchRightView from './table-search-right-view'

export default function TableSearchView (): JSX.Element {
  const table = useTable()

  return (
    <>
      <ThemeInputView
        autoFocus={table.autoFocus}
        ref={table.inputRef}
        rightElement={<TableSearchRightView />}
        placeholder='Search'
        onChange={table.handleQueryChange}
        onKeyDown={table.handleKeyDown}
        value={table.query}
      />
    </>
  )
}
