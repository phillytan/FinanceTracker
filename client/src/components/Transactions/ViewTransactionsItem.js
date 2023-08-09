import React from 'react'
import { Button } from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'

// https://mui.com/material-ui/react-dialog/

import UpdateTransactionItem from './UpdateTransactionItem'
import DeleteTransactionItem from './DeleteTransactionItem'

/**
 * Styling for dialog box
 */
const dialogTheme = {
  '& .MuiDialogContent-root': {
    padding: '20px',
  },

  '& .MuiDialogActions-root': {
    padding: '15px',
    marginTop: '5px',
  },
  '& .MuiDialog-paper': {
    minWidth: '60%',
  },
}

/**
 * Styling for Dialog Headings
 */
const DialogHeadings = {
  fontWeight: 'bold',
  marginTop: '20px',
}

/**
 *
 * @param {*} props item: the current row's item information
 * @returns
 */
const TransactionsItemButton = (props) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>More Info</Button>

      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        sx={dialogTheme}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          View Transaction
          <IconButton
            aria-label='close'
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
          <Typography sx={DialogHeadings}>Merchant Name:</Typography>
          <Typography gutterBottom>{props.item.merchantName}</Typography>

          <Typography sx={DialogHeadings}>Amount:</Typography>
          <Typography gutterBottom>{props.item.amount}</Typography>

          <Typography sx={DialogHeadings} gutterBottom>
            Address:
          </Typography>
          <Typography gutterBottom>{props.item.address}</Typography>

          <Typography sx={DialogHeadings}>Date:</Typography>
          <Typography gutterBottom>{props.item.date}</Typography>

          <Typography sx={DialogHeadings}>Transaction Type:</Typography>
          <Typography gutterBottom>{props.item.transactionType}</Typography>

          <Typography sx={DialogHeadings}>Currency:</Typography>
          <Typography gutterBottom>{props.item.currency}</Typography>

          {/* todo: payment method is static */}
          <Typography sx={DialogHeadings}>Payment Method:</Typography>
          <Typography gutterBottom>{props.item.paymentMethod}</Typography>

          {/* todo: payment method is static */}

          <Typography sx={DialogHeadings}>Notes:</Typography>
          <Typography gutterBottom>{props.item.description}</Typography>
        </DialogContent>

        <DialogActions>
          <UpdateTransactionItem item={props.item} />
          <DeleteTransactionItem item={props.item} />
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default TransactionsItemButton
