import { Table, TableProps } from '@chakra-ui/react'

export default function ThemeTableView (props: TableProps): JSX.Element {
  return (
    <Table size='sm' {...props} />
  )
}
