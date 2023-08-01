import * as React from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactionsAsync } from '../../redux/thunks/transactionThunk';

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
