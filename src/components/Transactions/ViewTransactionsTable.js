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
  date, transactionType, merchantName, currency, amount, address, paymentMethod, description, id
) {
  return { date, transactionType, merchantName, currency, amount, address, paymentMethod, description, id };
}

const rows = [
	createData("2020-02-11", "Grocery", "No Frills Vancouver", "CAD", "69.99", "1212 Test Street", "Cash", "Getting broke", "testId123"),
	createData("2019-05-31", "Food", "Uncle Fatihs UBC", "CAD", "12.99", "1313 Happy Avenue", "Credit Card", "Yum yums", "testId456"),
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
