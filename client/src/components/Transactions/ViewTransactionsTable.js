import * as React from 'react'
import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import { useSelector, useDispatch } from 'react-redux'
import TransactionItem from './ViewTransactionsItem'
import { getTransactionsAsync } from '../../redux/thunks/transactionThunk'
import { getDateString } from '../../utils/date'
import ForeignTransactionIndicator from './ForeignTransactionIndicator'

const TransactionsTable = () => {
  const [sort, setSort] = useState({ field: 'date', direction: 'asc' })
  const [sortedRows, setSortedRows] = useState([])
  const rows = useSelector((state) => state.transactions.transactions)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTransactionsAsync())
  }, [dispatch])

  const handleSort = (field) => {
    const isAsc = sort.field === field && sort.direction === 'asc'
    setSort({ field, direction: isAsc ? 'desc' : 'asc' })
  }

  useEffect(() => {
    let sortedRows = [...rows]
    sortedRows = sortedRows.sort((a, b) => {
      const isAsc = sort.direction === 'asc'
      if (sort.field === 'date') {
        return isAsc
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date)
      } else if (sort.field === 'transactionType') {
        return isAsc
          ? a.transactionType.localeCompare(b.transactionType)
          : b.transactionType.localeCompare(a.transactionType)
      } else if (sort.field === 'merchantName') {
        return isAsc
          ? a.merchantName.localeCompare(b.merchantName)
          : b.merchantName.localeCompare(a.merchantName)
      } else if (sort.field === 'amount') {
        return isAsc
          ? a.amountInCAD - b.amountInCAD
          : b.amountInCAD - a.amountInCAD
      }
    })
    setSortedRows(sortedRows)
  }, [rows, sort])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sort.field === 'date'}
                direction={sort.field === 'date' ? sort.direction : 'asc'}
                onClick={() => handleSort('date')}
              >
                Date
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sort.field === 'transactionType'}
                direction={
                  sort.field === 'transactionType' ? sort.direction : 'asc'
                }
                onClick={() => handleSort('transactionType')}
              >
                Type
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sort.field === 'merchantName'}
                direction={
                  sort.field === 'merchantName' ? sort.direction : 'asc'
                }
                onClick={() => handleSort('merchantName')}
              >
                Merchant Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sort.field === 'amount'}
                direction={sort.field === 'amount' ? sort.direction : 'asc'}
                onClick={() => handleSort('amount')}
              >
                Amount
              </TableSortLabel>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {getDateString(row.date)}
              </TableCell>
              <TableCell>{row.transactionType}</TableCell>
              <TableCell>{row.merchantName}</TableCell>
              <TableCell>
                {`${row.currency} ${row.amount}`}
                <br />
                {row.currency !== 'CAD' && (
                  <ForeignTransactionIndicator
                    currency={row.currency}
                    value={row.amount}
                    date={getDateString(row.date)}
                  />
                )}
              </TableCell>
              <TableCell>
                <TransactionItem item={row}></TransactionItem>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TransactionsTable
