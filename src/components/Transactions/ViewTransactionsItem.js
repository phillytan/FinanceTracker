import React from 'react';
import { Button } from "@mui/material"
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

// https://mui.com/material-ui/react-dialog/

import UpdateTransactionItem from './UpdateTransactionItem';

/**
 * Styling for dialog box
 */
const dialogTheme = {
    '& .MuiDialogContent-root': {
        padding: "20px",
    },

    '& .MuiDialogActions-root': {
        padding: '15px',
        'margin-top': '5px'
    },
    '& .MuiDialog-paper': {
        "min-width": "60%",
    },


}

/**
 * Styling for Dialog Headings 
 */
const DialogHeadings = {
    fontWeight: 'bold',
    "margin-top": '15px'
}



/**
 * 
 * @param {*} props item: the current row's item information
 * @returns 
 */
const TransactionsItemButton = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //todo: finish handle delete functionality
    const handleDelete = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>
                More Info
            </Button>

            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={dialogTheme}
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    View Transaction
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 17,
                            top: 13,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <Typography sx={DialogHeadings}>
                        Date:
                    </Typography>
                    <Typography gutterBottom>
                        {props.item.date}
                    </Typography>

                    <Typography sx={DialogHeadings}>
                        Amount:
                    </Typography>
                    <Typography gutterBottom>
                        {props.item.amount}
                    </Typography>

                    <Typography sx={DialogHeadings}>
                        Currency:
                    </Typography>
                    <Typography gutterBottom>
                        {props.item.currency}
                    </Typography>


                    {/* todo: payment method is static */}
                    <Typography sx={DialogHeadings}>
                        Payment Method:
                    </Typography>
                    <Typography gutterBottom>
                        Amex
                    </Typography>

                    {/* todo: payment method is static */}
                    <Typography sx={DialogHeadings} gutterTop>
                        Address:
                    </Typography>
                    <Typography gutterBottom>
                        487 east 12th avenue
                    </Typography>

                    <Typography sx={DialogHeadings}>
                        Notes:
                    </Typography>

                    <Typography gutterBottom>
                        Groceries for the first week of November.
                    </Typography>
                </DialogContent>

                <DialogActions>
                    {/* todo: implement update action */}
                    {/* <Button autoFocus>
                        Update
                    </Button> */}
                    <UpdateTransactionItem item={props.item} />
                    {/* todo: implement delete action. */}
                    <Button autoFocus onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default TransactionsItemButton;