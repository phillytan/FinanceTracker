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
import SavingItem from './ViewSavingsItem';
import { getSavingsAsync } from '../../redux/thunks/savingThunk';
import { getDateString } from '../../utils/date';
import ForeignTransactionIndicator from '../Transactions/ForeignTransactionIndicator';

const SavingsTable = () => {
	const rows = useSelector((state) => state.savings.savings);
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getSavingsAsync())
	}, [dispatch])

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Source</TableCell>
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
							<TableCell>{row.source}</TableCell>
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
							<TableCell align="right">
								<SavingItem item={row}></SavingItem>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default SavingsTable;
