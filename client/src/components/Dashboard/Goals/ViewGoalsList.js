import * as React from 'react';
import { useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import {
    Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getGoalsAsync } from '../../../redux/thunks/goalThunk';

const GoalsList = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getGoalsAsync())
	}, [dispatch]);
	const rows = useSelector((state) => state.goals.goals);

  	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell>My Goals</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
						key={row._id}
						sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell>{row.goalDetails}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default GoalsList;
