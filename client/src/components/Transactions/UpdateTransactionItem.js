import * as React from 'react';
import { useDispatch } from 'react-redux';
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
import { updateTransactionAsync } from '../../redux/thunks/transactionThunk';
import { getDateString } from '../../utils/date.js';


export default function UpdateTransactionItem(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
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
        setTransaction(props.item);
    };

    const handleUpdate = () => {
        let today = new Date();
        let transactionDate = new Date(transaction.date);
        if (transactionDate > today) {
					return global.setNotification("error", "Please ensure the transaction date is no later than today's date.");
				}
        if (!transaction.amount) {
					return global.setNotification("error", "Please enter a transaction amount.");
				}
        if (!transaction.date) {
					return global.setNotification("error", "Please enter a transaction date.");
				}
        if (!transaction.transactionType) {
					return global.setNotification("error", "Please enter a transaction type.");
				}
        if (!transaction.currency) {
					return global.setNotification("error", "Please enter a transaction currency.");
				}
        if (!transaction.paymentMethod) {
					return global.setNotification("error", "Please enter a transaction payment method.");
				}
        dispatch(updateTransactionAsync(transaction))
        resetFields();
    };
    const dateString = transaction.date ? getDateString(transaction.date) : ''

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
                        value={transaction.merchantName}
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
                        value={transaction.amount}
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
                        value={transaction.address}
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
                        id="outlined-select-transaction-type"
                        select
                        value={transaction.transactionType}
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
                    <Autocomplete
                      id="outlined-select-currency"
                      options={currencies}
                      autoHighlight
                      defaultValue={currencies.find((x) => x?.code.toUpperCase() === transaction.currency.toUpperCase())}
                      getOptionLabel={(option) => option ? `${option.name} (${option.code})`: 'None Selected'}
                      fullWidth
                      onChange={(_, newValue) => {
                        setTransaction({
                          ...transaction,
                          currency: newValue?.code.toUpperCase() || '',
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
                        value={transaction.paymentMethod}
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
                        value={transaction.description}
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