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
const paymentMethods = ["Cash", "Visa", "Amex", "MasterCard", "Debit Card", "Other"];


export default function UpdateTransactionItem(props) {
    const [open, setOpen] = React.useState(props.open);
    const [date, setDate] = React.useState('');
    const [transactionType, setTransactionType] = React.useState('');
    const [amount, setAmount] = React.useState(0);
    const [currency, setCurrency] = React.useState('');
    const [paymentMethod, setPaymentMethod] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setCurrency('');
        setTransactionType('');
        setOpen(false);
    };

    const handleUpdate = () => {
        if (date && transactionType && amount && currency && description) {
            // dispatch add 
            setDate('');
            setTransactionType('');
            setAmount(0);
            setCurrency('');
            setDescription('');
            setOpen(false);
        }
        // TODO: remove after update is implemented
        setOpen(false);
    };

    const handleDateChange = (e) => setDate(e.target.value);
    const handleTransactionTypeChange = (e) => setTransactionType(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);
    const handleCurrencyChange = (e) => setCurrency(e.target.value);
    const handlePaymentMethodChange = (e) => setPaymentMethod(e.target.value);
    const handleAddressChange = (e) => setAddress(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Update Transaction
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogTitle>Update Transaction</DialogTitle>
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
                        id="outlined-select-payment-method"
                        select
                        defaultValue={paymentMethod}
                        fullWidth
                        onChange={handlePaymentMethodChange}
                        label="Payment Method"
                        helperText="Please select your payment method"
                        sx={{ mb: 2 }}
                    >
                        {paymentMethods.map((method) => (
                            <MenuItem key={method} value={method}>
                                {method}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="dense"
                        id="address"
                        label="Address"
                        type="text"
                        fullWidth
                        onChange={handleAddressChange}
                        variant="standard"
                        sx={{ mb: 2 }}
                    />
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
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}