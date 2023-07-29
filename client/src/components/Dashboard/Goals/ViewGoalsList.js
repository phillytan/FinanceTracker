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
	ListItemText,
	ListItem
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getGoalsAsync } from '../../../redux/thunks/goalThunk';

const GoalsList = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getGoalsAsync())
	}, [dispatch]);
	const rows = useSelector((state) => state.goals.goals);
	console.log(rows);

  	return (
		// <div>
		// 	<h4>My Goals</h4>
		// 	<List>
		// 		{rows.map((row) => {
		// 			<ListItem disablePadding key={row._id}>
		// 				<ListItemText primary={row.goalDetails}>
		// 				</ListItemText>
		// 			</ListItem>
		// 		})}
		// 	</List>
		// </div>
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
						// <ListItem disablePadding key={row._id}>
						// 	<ListItemText primary={row.goalDetails}>
						// 	</ListItemText>
						// </ListItem>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default GoalsList;
