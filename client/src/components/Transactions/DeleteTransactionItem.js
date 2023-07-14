import * as React from 'react';
import { useDispatch } from 'react-redux';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { deleteTransaction } from '../../redux/slices/transactionsSlice'
import { deleteTransactionAsync } from '../../redux/thunks/transactionThunk';

export default function UpdateTransactionItem(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        // dispatch(deleteTransaction(props.item));
        dispatch(deleteTransactionAsync(props.item));
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogTitle>Delete Transaction</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        Are you sure you want to delete this transaction?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}