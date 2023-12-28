import { forwardRef } from 'react'

const Table = forwardRef<
HTMLTableElement,
React.TableHTMLAttributes<HTMLTableElement>
>(({ ...props }, ref) => {
  return <table {...props} ref={ref} />
})

const TableBody = ({ ...props }): JSX.Element => {
  return <tbody {...props} />
}

const TableHeader = ({ ...props }): JSX.Element => {
  return <thead {...props} />
}

const TableRow = ({ ...props }): JSX.Element => {
  return <tr {...props} />
}

const TableCell = ({ ...props }): JSX.Element => {
  return <td {...props} />
}

export { Table, TableRow, TableCell, TableBody, TableHeader }
