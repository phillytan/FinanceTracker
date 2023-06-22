import * as React from 'react';
import { useDispatch } from 'react-redux';
import { updateTransactionItem } from '../../redux/actions/transactions.js';
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


export default function UpdateTransactionItem(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const default_state = {
        merchantName: props.item.merchantName,
        amount: props.item.amount,
        address: props.item.address,
        date: props.item.date,
        transactionType: props.item.transactionType,
        currency: props.item.currency,
        paymentMethod: props.item.paymentMethod,
        description: props.item.description
    }
    const [transaction, setTransaction] = React.useState(default_state);

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

    const handleUpdate = () => {
        if (transaction.date && transaction.transactionType && transaction.amount && transaction.currency && transaction.description) {
            // dispatch add TODO
            transaction.id = props.item.id;
            dispatch(updateTransactionItem(transaction));
            resetFields();
        }
    };


    return (
        <div>
            <Button onClick={handleClickOpen}>
                Update Transaction
            </Button>
            <Dialog open={open} onClose={resetFields} maxWidth="md">
                <DialogTitle>Update Transaction</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        Please enter the new transaction details below:
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="merchantName"
                        label="Merchant Name"
                        defaultValue={transaction.merchantName}
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
                        defaultValue={transaction.amount}
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
                        defaultValue={transaction.address}
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
                        defaultValue={transaction.date}
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
                        id="outlined-select-payment-method"
                        select
                        defaultValue={transaction.paymentMethod}
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
                        defaultValue={transaction.description}
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