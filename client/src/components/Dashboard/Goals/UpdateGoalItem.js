import * as React from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControlLabel,
} from '@mui/material'
import { updateGoalAsync } from '../../../redux/thunks/goalThunk'

export default function UpdateGoalItem(props) {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const [openError, setOpenError] = React.useState(false)
  const default_state = {
    goalDetails: '',
    completed: false,
  }
  const [goal, setGoal] = React.useState(default_state)

  const handleChange = (event) => {
    if (event.target.name === 'completed') {
      setGoal({
        ...goal,
        [event.target.name]: !(event.target.value === 'true'),
      })
    } else {
      setGoal({
        ...goal,
        [event.target.name]: event.target.value,
      })
    }
  }

  const resetFields = () => {
    setOpenError(false)
    setOpen(false)
    setGoal(default_state)
  }

  const closeErrorMessage = () => {
    setOpenError(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
    setGoal(props.item)
  }

  const handleUpdate = () => {
    if (goal.goalDetails) {
      dispatch(updateGoalAsync(goal))
      resetFields()
    } else {
      setOpenError(true)
    }
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>Update</Button>
      <Dialog open={openError} onClose={closeErrorMessage} maxWidth='md'>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please ensure the goal field is not empty.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeErrorMessage}>Continue</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={resetFields} maxWidth='md'>
        <DialogTitle>Update Goal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new goal details below:
          </DialogContentText>
          <TextField
            margin='dense'
            id='goal'
            label='My Goal'
            value={goal.goalDetails}
            type='text'
            fullWidth
            name='goalDetails'
            onChange={handleChange}
            variant='standard'
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                margin='dense'
                id='goal'
                checked={goal.completed}
                value={goal.completed}
                type='text'
                name='completed'
                onClick={handleChange}
                variant='standard'
              />
            }
            label={goal.completed ? 'Complete' : 'Incomplete'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={resetFields}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
