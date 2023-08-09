import * as React from 'react'
import { useEffect } from 'react'
import TableContainer from '@mui/material/TableContainer'
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import DeleteGoalItem from './DeleteGoalItem'
import UpdateGoalItem from './UpdateGoalItem'
import { useSelector, useDispatch } from 'react-redux'
import { getGoalsAsync, updateGoalAsync } from '../../../redux/thunks/goalThunk'

const GoalsList = () => {
  const [goal, setGoal] = React.useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(updateGoalAsync(goal))
    dispatch(getGoalsAsync())
  }, [dispatch, goal])
  let rows = useSelector((state) => state.goals.goals)
  const handleUpdate = (row) => {
    setGoal({
      ...row,
      completed: !row.completed,
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '-webkit-fill-available', border:0}} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>My Goals</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{border:0}}>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },height: '56px' }}
            >
              <TableCell>{row.goalDetails}</TableCell>
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      onClick={() => handleUpdate(row)}
                      checked={row.completed}
                    />
                  }
                  label={row.completed ? 'Complete' : 'Incomplete'}
                />
              </TableCell>
              <TableCell>
                <UpdateGoalItem item={row}></UpdateGoalItem>
              </TableCell>
              <TableCell>
                <DeleteGoalItem item={row}></DeleteGoalItem>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default GoalsList
