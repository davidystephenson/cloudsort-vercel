import ThemeThView from '../theme/theme-th-view'
import { useTable } from './table-context'

export default function TableColumnsView (): JSX.Element {
  const table = useTable()
  const columns = table.columns.map((column, index) => {
    const w = index === 0 && { w: '100%' }
    return (
      <ThemeThView key={column} {...w}>
        {column}
      </ThemeThView>
    )
  })
  const view = <>{columns}</>
  return view
}
