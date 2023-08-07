import * as React from 'react';
import { useDispatch } from 'react-redux';
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
import { updateSavingAsync } from '../../redux/thunks/savingThunk.js';
import { getDateString } from '../../utils/date.js';


export default function UpdateSavingItem(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const default_state = {
        merchantName: '',
        amount: '',
        address: '',
        date: '',
        currency: '',
        description: ''
    }
    const [saving, setSaving] = React.useState(default_state);

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
        setSaving(props.item);
    };

    const handleUpdate = () => {
        let today = new Date();
        let savingDate = new Date(saving.date);
        if (savingDate > today) {
            setOpenError(true);
            return;
        }
        if (saving.amount && saving.date && saving.currency) {
            dispatch(updateSavingAsync(saving))
            resetFields();
        }
    };
    const dateString = saving.date ? getDateString(saving.date) : ''

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Update Saving
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
                <DialogTitle>Update Saving</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        Please enter the new saving details below:
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="merchantName"
                        label="Merchant Name"
                        value={saving.merchantName}
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
                        value={saving.amount}
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
                        value={saving.address}
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
                        value={dateString}
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
                        value={saving.currency}
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
                        value={saving.description}
                        type="text"
                        fullWidth
                        name="description"
                        onChange={handleChange}
                        variant="standard"
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={resetFields}>Cancel</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}