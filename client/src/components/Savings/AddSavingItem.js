import * as React from 'react';
import { useDispatch } from 'react-redux';
import { addSavingsAsync } from '../../redux/thunks/savingThunk';

import { currencies } from '../../resources/transactionOptions.js';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    MenuItem,
    TextField
} from '@mui/material';

const default_state = {
    merchantName: '',
    amount: '',
    address: '',
    date: '',
    currency: '',
    description: ''
}

export default function AddSavingItem() {
    const [open, setOpen] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [saving, setSaving] = React.useState(default_state);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setSaving({
            ...saving,
            [event.target.name]: event.target.value
        });
    }

    const resetFields = () => {
        setOpenError(false);
        setOpen(false);
        setSaving(default_state);
    }

    const closeErrorMessage = () => {
        setOpenError(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleAdd = () => {
        let today = new Date();
        let savingDate = new Date(saving.date);
        if (savingDate > today) {
            setOpenError(true);
            return;
        }
        if (saving.merchantName && saving.amount && saving.address && saving.date && saving.currency) {
            dispatch(addSavingsAsync([saving]));
            resetFields();
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Saving
            </Button>
            <Dialog open={openError} onClose={closeErrorMessage} maxWidth="md">
                <DialogTitle>Error</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        Please ensure the saving date is no later than today's date.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeErrorMessage}>Continue</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={resetFields} maxWidth="md">
                <DialogTitle>Add Saving</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        Please enter the saving details below:
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="merchantName"
                        label="Merchant Name"
                        type="text"
                        fullWidth
                        name="merchantName"
                        onChange={handleChange}
                        variant="standard"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        id="amount"
                        label="Amount"
                        type="number"
                        fullWidth
                        name="amount"
                        onChange={handleChange}
                        variant="standard"
                        sx={{ mb: 5 }}
                    />
                    <TextField
                        margin="dense"
                        id="address"
                        label="Address of Saving"
                        type="text"
                        fullWidth
                        name="address"
                        onChange={handleChange}
                        variant="standard"
                        sx={{ mb: 2 }}
                    />
                    <InputLabel id="date-label" sx={{ marginTop: 2 }}>
                        Date
                    </InputLabel>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="date"
                        type="date"
                        name="date"
                        fullWidth
                        onChange={handleChange}
                        variant="standard"
                        sx={{ mb: 5 }}
                    />
                    <TextField
                        id="outlined-select-currency"
                        select
                        defaultValue={default_state.currency}
                        fullWidth
                        name="currency"
                        onChange={handleChange}
                        label="Currency"
                        helperText="Please select your currency"
                        sx={{ mb: 2 }}
                    >
                        {currencies.map((currency) => (
                            <MenuItem key={currency} value={currency}>
                                {currency}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        name="description (optional)"
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