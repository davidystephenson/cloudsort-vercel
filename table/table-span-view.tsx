import { ReactNode } from 'react'
import { useTable } from './table-context'
import ThemeTdView from '@/theme/theme-td-view'

export default function TableSpanView (props: {
  children: ReactNode
}): JSX.Element {
  const table = useTable()
  const colSpan = table.columns.length
  return (
    <ThemeTdView colSpan={colSpan}>
      {props.children}
    </ThemeTdView>
  )
}
