import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactionsAsync } from '../../redux/thunks/transactionThunk';

const Summary = () => {
    const styles = {
        summary: {
            "fontSize": 25,
			"paddingRight": 125
        }
    };
	const rows = useSelector((state) => state.transactions.transactions);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTransactionsAsync())
	}, [dispatch]);

    let totalSpendings = rows.reduce((sum, transaction) => {
        return sum + transaction["amount"];
    }, 0);
    totalSpendings = Math.round(totalSpendings * 100) / 100
    let totalSavings = 0;

  	return (
		<div style={{ display: "flex", justifyContent: "flex-end" }}>
			<p style={styles.summary}>Total Spending (CAD): ${totalSpendings}</p>
			<p style={styles.summary}>Total Savings (CAD): ${totalSavings}</p>
		</div>
		// <TableContainer component={Paper}>
		// 	<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
		// 		<TableHead>
		// 			<TableRow>
		// 				<TableCell>Date</TableCell>
		// 				<TableCell>Type</TableCell>
		// 				<TableCell>Merchant Name</TableCell>
		// 				<TableCell align="right">Amount</TableCell>
		// 				<TableCell ></TableCell>
		// 			</TableRow>
		// 		</TableHead>
		// 		<TableBody>
		// 			{rows.map((row) => (
		// 				<TableRow
		// 					key={row._id}
		// 					sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
		// 				>
		// 					<TableCell component="th" scope="row">
		// 						{getDateString(row.date)}
		// 					</TableCell>
		// 					<TableCell>{row.transactionType}</TableCell>
		// 					<TableCell>{row.merchantName}</TableCell>
		// 					<TableCell align="right">
		// 						{`${row.currency} ${row.amount}`}
		// 					</TableCell>
		// 					<TableCell><TransactionItem item={row}></TransactionItem></TableCell>
		// 				</TableRow>
		// 			))}
		// 		</TableBody>
		// 	</Table>
		// </TableContainer>
	);
}

export default Summary;
