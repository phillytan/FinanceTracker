import * as React from 'react';
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

const currencies = ["CAD", "USD", "EUR"];
const transactionTypes = ["Grocery", "Transportation", "Entertainment", "Food", "Other"];


export default function AddTransactionItem() {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState('');
    const [transactionType, setTransactionType] = React.useState('');
    const [amount, setAmount] = React.useState(0);
    const [currency, setCurrency] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setCurrency('');
        setTransactionType('');
        setOpen(false);
    };

    const handleAdd = () => {
        if (date && transactionType && amount && currency && description) {
            // dispatch add 
            setDate('');
            setTransactionType('');
            setAmount(0);
            setCurrency('');
            setDescription('');
            setOpen(false);
        }
    };

    const handleDateChange = (e) => setDate(e.target.value);
    const handleTransactionTypeChange = (e) => setTransactionType(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);
    const handleCurrencyChange = (e) => setCurrency(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Transaction
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogTitle>Add Transaction</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        Please enter the transaction details below:
                    </DialogContentText>
                    <InputLabel id="date-label" sx={{ marginTop: 2 }}>
                        Date
                    </InputLabel>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="date"
                        type="date"
                        fullWidth
                        onChange={handleDateChange}
                        variant="standard"
                        sx={{ mb: 5 }}
                    />
                    <TextField
                        id="outlined-select-transaction-type"
                        select
                        defaultValue={transactionType}
                        fullWidth
                        onChange={handleTransactionTypeChange}
                        label="Transaction Type"
                        helperText="Please select your transaction type"
                    >
                        {transactionTypes.map((transactionType) => (
                            <MenuItem key={transactionType} value={transactionType}>
                                {transactionType}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="dense"
                        id="amount"
                        label="Amount"
                        type="number"
                        fullWidth
                        onChange={handleAmountChange}
                        variant="standard"
                        sx={{ mb: 5 }}
                    />
                    <TextField
                        id="outlined-select-currency"
                        select
                        defaultValue={currency}
                        fullWidth
                        onChange={handleCurrencyChange}
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
                        onChange={handleDescriptionChange}
                        variant="standard"
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}