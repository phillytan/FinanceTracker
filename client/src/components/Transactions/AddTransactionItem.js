import * as React from 'react';
import { useDispatch } from 'react-redux';
import { addTransactionsAsync } from '../../redux/thunks/transactionThunk';

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
    TextField,
    Autocomplete
} from '@mui/material';

const default_state = {
    merchantName: '',
    amount: '',
    address: '',
    date: '',
    transactionType: '',
    currency: '',
    paymentMethod: '',
    description: ''
}

export default function AddTransactionItem() {
    const [open, setOpen] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [transaction, setTransaction] = React.useState(default_state);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setTransaction({
            ...transaction,
            [event.target.name]: event.target.value
        });
    }

    const resetFields = () => {
        setOpenError(false);
        setOpen(false);
        setTransaction(default_state);
    }

    const closeErrorMessage = () => {
        setOpenError(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleAdd = () => {
        let today = new Date();
        let transactionDate = new Date(transaction.date);
        if (transactionDate > today) {
            setOpenError(true);
            return;
        }
        if (transaction.merchantName && transaction.amount && transaction.address && transaction.date && transaction.transactionType && transaction.currency && transaction.paymentMethod) {
            dispatch(addTransactionsAsync([transaction]));
            resetFields();
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Transaction
            </Button>
            <Dialog open={openError} onClose={closeErrorMessage} maxWidth="md">
                <DialogTitle>Error</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        Please ensure the transaction date is no later than today's date.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeErrorMessage}>Continue</Button>
                </DialogActions>
            </Dialog>
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
                        sx={{ mb: 2 }}
                        helperText="Please select your transaction type"
                    >
                        {transactionTypes.map((transactionType) => (
                            <MenuItem key={transactionType} value={transactionType}>
                                {transactionType}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Autocomplete
                      id="outlined-select-currency"
                      options={currencies}
                      autoHighlight
                      defaultValue={currencies.find((x) => x.code === 'cad')}
                      getOptionLabel={(option) => `${option.name} (${option.code})`}
                      fullWidth
                      onChange={(_, newValue) => {
                        setTransaction({
                          ...transaction,
                          currency: newValue.code.toUpperCase(),
                        });
                      }}
                      name="currency"
                      sx={{ mb: 2 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Currency"
                          helperText="Please select your currency"
                          fullWidth
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                          }}
                        />
                      )}
                    />
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
