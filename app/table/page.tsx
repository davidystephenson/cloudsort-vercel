'use client'

import TanTable from '@/lib/tan/tan-table'
// import ThemeTableView from '@/lib/theme/theme-table-view'

export default function TablePage (): JSX.Element {
  return (
    <>
      <TanTable />
      {/* <ThemeTableView /> */}
    </>
  )
}

// <Table aria-label='Example table with dynamic content'>
//   <TableBody>
//     <Virtuoso
//       style={{ height: '100%' }}
//       data={rows}
//       itemContent={(index, user) => {
//         console.log('user')
//         return (
//           <TableRow key={index}>
//             <TableCell>{user.name}</TableCell>
//             <TableCell>{user.role}</TableCell>
//             <TableCell>{user.status}</TableCell>
//           </TableRow>
//         )
//       }}
//     />
//   </TableBody>
// </Table>
