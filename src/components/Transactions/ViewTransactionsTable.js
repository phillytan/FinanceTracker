import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import TransactionItem from './ViewTransactionsItem';

const TransactionsTable = () => {
	const rows = useSelector(state => state.transactionReducer.transaction);
  	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Type</TableCell>
						<TableCell>Merchant Name</TableCell>
						<TableCell align="right">Amount</TableCell>
						<TableCell ></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{row.date}
							</TableCell>
							<TableCell>{row.transactionType}</TableCell>
							<TableCell>{row.merchantName}</TableCell>
							<TableCell align="right">
								{`${row.currency} ${row.amount}`}
							</TableCell>
							<TableCell><TransactionItem item={row}></TransactionItem></TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default TransactionsTable;
