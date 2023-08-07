import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactionsAsync } from '../../redux/thunks/transactionThunk';
import { getSavingsAsync } from '../../redux/thunks/savingThunk';

const Summary = () => {
	const styles = {
		summary: {
			"fontSize": 25,
			"paddingRight": 125
		}
	};
	const spendings = useSelector((state) => state.transactions.transactions);
	const savings = useSelector((state) => state.savings.savings);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTransactionsAsync());
		dispatch(getSavingsAsync())
	}, [dispatch]);

	let totalSpendings = spendings.reduce((sum, transaction) => {
		return sum + transaction["amount"];
	}, 0);
	totalSpendings = Math.round(totalSpendings * 100) / 100

	let totalSavings = savings.reduce((sum, transaction) => {
		return sum + transaction["amount"];
	}, 0);
	totalSavings = Math.round(totalSavings * 100) / 100

	return (
		<div style={{ display: "flex", justifyContent: "flex-end" }}>
			<p style={styles.summary}>Total Spending (CAD): ${totalSpendings}</p>
			<p style={styles.summary}>Total Savings (CAD): ${totalSavings}</p>
		</div>
	);
}

export default Summary;
