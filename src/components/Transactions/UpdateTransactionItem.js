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

const currencies = ["CAD", "USD", "EUR", "AUD", "JPY", "KRW", "RMB", "HKD", "TWD", "MXN", "MYR", "NZD", "THB"];
const transactionTypes = ["Grocery", "Transportation", "Entertainment", "Food", "Other"];


export default function UpdateTransactionItem(props) {
    const default_state = {
        open: false,
        date: '',
        transactionType: '',
        amount: 0,
        currency: '',
        description: ''
    }
    const [transaction, setTransaction] = React.useState(default_state);

    const handleChange = (event) => {
        setTransaction({
            ...transaction,
            [event.target.name]: event.target.value
        });
    }

    const resetFields = () => {
        setTransaction(default_state);
    }

    const handleClickOpen = () => {
        setTransaction({
            ...transaction,
            open: true
        });
    };

    const handleUpdate = () => {
        if (transaction.date && transaction.transactionType && transaction.amount && transaction.currency && transaction.description) {
            // dispatch add TODO
            resetFields();
        }
    };


    return (
        <div>
            <Button onClick={handleClickOpen}>
                Update Transaction
            </Button>
            <Dialog open={transaction.open} onClose={resetFields} maxWidth="md">
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
                        onChange={handleChange}
                        variant="standard"
                        sx={{ mb: 5 }}
                    />
                    <TextField
                        id="outlined-select-transaction-type"
                        select
                        defaultValue={transaction.transactionType}
                        fullWidth
                        name="transactionType"
                        onChange={handleChange}
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
                        name="amount"
                        onChange={handleChange}
                        variant="standard"
                        sx={{ mb: 5 }}
                    />
                    <TextField
                        id="outlined-select-currency"
                        select
                        defaultValue={transaction.currency}
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