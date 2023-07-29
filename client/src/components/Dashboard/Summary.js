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
	);
}

export default Summary;
