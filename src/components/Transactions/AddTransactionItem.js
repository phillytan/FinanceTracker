import * as React from 'react';
import { useDispatch } from 'react-redux';
import { addTransactionItem } from '../../redux/actions/transactions.js';
import { currencies, transactionTypes, paymentMethods } from '../../resources/transactionOptions.js';
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
    amount: 0,
    address: '',
    date: '',
    transactionType: '',
    currency: '',
    paymentMethod: '',
    description: ''
}

export default function AddTransactionItem() {
    const [open, setOpen] = React.useState(false);
    const [transaction, setTransaction] = React.useState(default_state);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setTransaction({
            ...transaction,
            [event.target.name]: event.target.value
        });
    }

    const resetFields = () => {
        setOpen(false);
        setTransaction(default_state);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleAdd = () => {
        if (transaction.date && transaction.transactionType && transaction.amount && transaction.currency && transaction.description) {
            dispatch(addTransactionItem(transaction));
            resetFields();
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Transaction
            </Button>
            <Dialog open={open} onClose={resetFields} maxWidth="md">
                <DialogTitle>Add Transaction</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        Please enter the transaction details below:
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
                        label="Address of Transaction"
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
                        id="outlined-select-transaction-type"
                        select
                        defaultValue={default_state.transactionType}
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
                        id="outlined-select-payment-method"
                        select
                        defaultValue={default_state.paymentMethod}
                        fullWidth
                        name="paymentMethod"
                        onChange={handleChange}
                        label="Payment Method"
                        helperText="Please select the method of payment used"
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
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}