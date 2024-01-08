import { TableRow, TableCell, Table } from '@nextui-org/react'
import { FixedSizeList as List } from 'react-window'

const VirtualizedTable = ({ data }: any): JSX.Element => {
  const Row = ({ index, style }: any): any => (
    <TableRow style={style}>
      <TableCell>{data[index].column1}</TableCell>
      <TableCell>{data[index].column2}</TableCell>
      {/* Add more TableCell components for other columns */}
    </TableRow>
  )

  return (
    <Table>
      {/* @ts-expect-error */}
      <List
        height={400} // Set the height of the visible area
        itemCount={data.length} // Total number of rows
        itemSize={50} // Height of each row
        width='100%'
      >
        {Row}
      </List>
    </Table>
  )
}

const tableData = [
  { column1: 'Data 1', column2: 'Info 1' },
  { column1: 'Data 2', column2: 'Info 2' }
  // Add more data objects for additional rows
]

const YourPage = (): JSX.Element => {
  return (
    <div>
      <h1>Virtualized Table Example</h1>
      <VirtualizedTable data={tableData} />
    </div>
  )
}

export default YourPage
