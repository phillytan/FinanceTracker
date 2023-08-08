import * as React from 'react';
import { useDispatch } from 'react-redux';
import { addGoalAsync } from '../../../redux/thunks/goalThunk';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@mui/material';

const default_state = {
    goalDetails: '',
    completed: false
}

export default function AddGoalItem() {
    const [open, setOpen] = React.useState(false);
    const [goal, setGoal] = React.useState(default_state);
    const [openError, setOpenError] = React.useState(false);
    const dispatch = useDispatch();

    const closeErrorMessage = () => {
        setOpenError(false);
    }

    const handleChange = (event) => {
        setGoal({
            ...goal,
            [event.target.name]: event.target.value
        });
    }

    const resetFields = () => {
        setOpen(false);
        setGoal(default_state);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleAdd = () => {
        if (goal.goalDetails) {
            dispatch(addGoalAsync([goal]));
            resetFields();
        } else {
            setOpenError(true);
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Goal
            </Button>
            <Dialog open={openError} onClose={closeErrorMessage} maxWidth="md">
                <DialogTitle>Error</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        Please ensure the goal is not left blank.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeErrorMessage}>Continue</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={resetFields} maxWidth="md">
                <DialogTitle>Add Goal</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        Please enter your new financial goal below:
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="goal"
                        label="My Goal"
                        type="text"
                        fullWidth
                        name="goalDetails"
                        onChange={handleChange}
                        variant="standard"
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={resetFields}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}