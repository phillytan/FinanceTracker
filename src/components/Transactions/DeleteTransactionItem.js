import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

export default function UpdateTransactionItem(props) {
    const [open, setOpen] = React.useState(props.open);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    <Button onClick={handleClose}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}