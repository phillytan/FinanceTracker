import * as React from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactionsAsync } from '../../redux/thunks/transactionThunk';
import { getSavingsAsync } from '../../redux/thunks/savingThunk';

const Summary = () => {
	const styles = {
		summary: {
			"fontSize": 22,
			"width": "-webkit-fill-available",
			"margin": "5px 25px 15px 25px"
		},
		grid: {
			'height': "345px",
			'display': 'flex',
			'flexDirection': 'column',
			'justifyContent': 'space-between',
		},
		card: {
			"padding" : "4px 0",
			"margin":"0"
		}
	};
	const transactions = useSelector((state) => state.transactions.transactions);
	const savings = useSelector((state) => state.savings.savings);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTransactionsAsync());
		dispatch(getSavingsAsync())
	}, [dispatch]);

	let totalSpendings = transactions.reduce((sum, transaction) => {
		return sum + transaction["amountInCAD"];
	}, 0);
	totalSpendings = Math.round(totalSpendings * 100) / 100

	
	let totalSavings = savings.reduce((sum, saving) => {
		return sum + saving["amountInCAD"];
	}, 0);
	totalSavings = Math.round(totalSavings * 100) / 100
	return (
		<Grid item xs={12} sm={12} md={6} lg={4} xl={4}  style={styles.grid}>
			<Card variant={'outlined'} style={styles.card}>
				<CardContent width={"100%"} >
					<div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", flexWrap: "wrap" }}>
						<p style={styles.summary}>Total Spending (CAD):</p>
						<p style={styles.summary}>${totalSpendings}</p>
					</div>
				</CardContent>
			</Card>
			<Card variant={'outlined'} style={styles.card}>
				<CardContent width={"100%"} >
					<div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", flexWrap: "wrap" }}>
						<p style={styles.summary}>Total Savings (CAD): </p>
						<p style={styles.summary}>${totalSavings}</p>
					</div>
				</CardContent>
			</Card>
		</Grid>
	);
}

export default Summary;
