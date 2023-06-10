import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import TransactionItem from './ViewTransactionsItem';

function createData(
  date, type, name, currency, amount
) {
  return { date, type, name, currency, amount };
}

const rows = [
	createData("2/11/2020", "Groceries", "No Frills Vancouver", "CAD", "69.99"),
	createData("2/12/2020", "Food", "Uncle Fatihs UBC", "CAD", "12.99"),
];

const TransactionsTable = () => {
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
							key={row.name}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{row.date}
							</TableCell>
							<TableCell>{row.type}</TableCell>
							<TableCell>{row.name}</TableCell>
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
