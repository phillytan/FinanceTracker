import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import SavingItem from './ViewSavingsItem'
import { getSavingsAsync } from '../../redux/thunks/savingThunk'
import { getDateString } from '../../utils/date'
import ForeignTransactionIndicator from '../Transactions/ForeignTransactionIndicator'

const SavingsTable = () => {
  const [sort, setSort] = useState({ field: 'date', direction: 'asc' })
  const [sortedRows, setSortedRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const rows = useSelector((state) => state.savings.savings)

  const dispatch = useDispatch()

  const handleSort = (field) => {
    const isAsc = sort.field === field && sort.direction === 'asc'
    setSort({ field, direction: isAsc ? 'desc' : 'asc' })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    dispatch(getSavingsAsync())
  }, [dispatch])

  useEffect(() => {
    let sortedRows = [...rows]
    sortedRows = sortedRows.sort((a, b) => {
      const isAsc = sort.direction === 'asc'
      if (sort.field === 'date') {
        return isAsc
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date)
      } else if (sort.field === 'source') {
        return isAsc
          ? a.source.localeCompare(b.source)
          : b.source.localeCompare(a.source)
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
                active={sort.field === 'source'}
                direction={sort.field === 'source' ? sort.direction : 'asc'}
                onClick={() => handleSort('source')}
              >
                Source
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
          {sortedRows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {getDateString(row.date)}
                </TableCell>
                <TableCell>{row.source}</TableCell>
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
                <TableCell align='right'>
                  <SavingItem item={row}></SavingItem>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component='div'
        count={sortedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
}

export default SavingsTable
