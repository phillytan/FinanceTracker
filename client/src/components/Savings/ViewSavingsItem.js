import React from 'react'
import { Button } from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'

import UpdateSavingItem from './UpdateSavingItem'
import DeleteSavingItem from './DeleteSavingItem'

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
const SavingsItemButton = (props) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [dateStr] = props.item.date.split('T')

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
          View Saving
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
          <Typography sx={DialogHeadings}>Source:</Typography>
          <Typography gutterBottom>{props.item.source}</Typography>

          <Typography sx={DialogHeadings}>Amount:</Typography>
          <Typography gutterBottom>{props.item.amount}</Typography>

          <Typography sx={DialogHeadings} gutterBottom>
            Address:
          </Typography>
          <Typography gutterBottom>{props.item.address}</Typography>

          <Typography sx={DialogHeadings}>Date:</Typography>
          <Typography gutterBottom>{dateStr}</Typography>
          <Typography sx={DialogHeadings}>Currency:</Typography>
          <Typography gutterBottom>{props.item.currency}</Typography>

          <Typography sx={DialogHeadings}>Notes:</Typography>
          <Typography gutterBottom>{props.item.description}</Typography>
        </DialogContent>

        <DialogActions>
          <UpdateSavingItem item={props.item} />
          <DeleteSavingItem item={props.item} />
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SavingsItemButton
