import * as React from 'react';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import TransactionItem from './ViewTransactionsItem';
import { getTransactionsAsync } from '../../redux/thunks/transactionThunk';
import { getDateString } from '../../utils/date';
import ForeignTransactionIndicator from './ForeignTransactionIndicator';

const TransactionsTable = () => {
	const rows = useSelector((state) => state.transactions.transactions);
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getTransactionsAsync())
	}, [dispatch])

  	return (
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Type</TableCell>
							<TableCell>Merchant Name</TableCell>
							<TableCell align="right">Amount</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row._id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{getDateString(row.date)}
								</TableCell>
								<TableCell>{row.transactionType}</TableCell>
								<TableCell>{row.merchantName}</TableCell>
								<TableCell align="right">
									{`${row.currency} ${row.amount}`}
									<br />
									{row.currency !== "CAD" && (
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
		);
}

export default TransactionsTable;
