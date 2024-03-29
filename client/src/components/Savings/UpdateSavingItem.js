import * as React from 'react'
import { useDispatch } from 'react-redux'
import { currencies } from '../../resources/transactionOptions.js'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  TextField,
  Autocomplete,
} from '@mui/material'
import { updateSavingAsync } from '../../redux/thunks/savingThunk.js'
import { getDateString } from '../../utils/date.js'

export default function UpdateSavingItem(props) {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const default_state = {
    source: '',
    amount: '',
    address: '',
    date: '',
    currency: '',
    description: '',
  }
  const [saving, setSaving] = React.useState(default_state)

  const handleChange = (event) => {
    setSaving({
      ...saving,
      [event.target.name]: event.target.value,
    })
  }

  const resetFields = () => {
    setOpen(false)
    setSaving(default_state)
  }

  const handleClickOpen = () => {
    setOpen(true)
    setSaving(props.item)
  }

  const handleUpdate = () => {
    let today = new Date()
    let savingDate = new Date(saving.date)
    if (savingDate > today) {
      return global.setNotification(
        'error',
        "Please ensure the saving date is no later than today's date.",
      )
    }
    if (!saving.source) {
      return global.setNotification('error', 'Please enter a saving source.')
    }
    if (!saving.amount) {
      return global.setNotification('error', 'Please enter a saving amount.')
    }
    if (!saving.date) {
      return global.setNotification('error', 'Please enter a saving date.')
    }
    if (!saving.currency) {
      return global.setNotification('error', 'Please enter a saving currency.')
    }
    dispatch(updateSavingAsync(saving))
    resetFields()
  }
  const dateString = saving.date ? getDateString(saving.date) : ''

  return (
    <div>
      <Button onClick={handleClickOpen}>Update Saving</Button>
      <Dialog open={open} onClose={resetFields} maxWidth='md'>
        <DialogTitle>Update Saving</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new saving details below:
          </DialogContentText>
          <TextField
            margin='dense'
            id='source'
            label='Source'
            value={saving.source}
            type='text'
            fullWidth
            name='source'
            onChange={handleChange}
            variant='standard'
            sx={{ mb: 2 }}
          />
          <TextField
            margin='dense'
            id='amount'
            label='Amount'
            value={saving.amount}
            type='number'
            fullWidth
            name='amount'
            onChange={handleChange}
            variant='standard'
            sx={{ mb: 5 }}
          />
          <TextField
            margin='dense'
            id='address'
            label='Address of Saving'
            value={saving.address}
            type='text'
            fullWidth
            name='address'
            onChange={handleChange}
            variant='standard'
            sx={{ mb: 2 }}
          />
          <InputLabel id='date-label' sx={{ marginTop: 2 }}>
            Date
          </InputLabel>
          <TextField
            autoFocus
            margin='dense'
            id='date'
            value={dateString}
            type='date'
            name='date'
            fullWidth
            onChange={handleChange}
            variant='standard'
            sx={{ mb: 5 }}
          />
          <Autocomplete
            id='outlined-select-currency'
            options={currencies}
            autoHighlight
            defaultValue={currencies.find(
              (x) => x?.code.toUpperCase() === saving.currency.toUpperCase(),
            )}
            getOptionLabel={(option) =>
              option ? `${option.name} (${option.code})` : 'None Selected'
            }
            fullWidth
            onChange={(_, newValue) => {
              setSaving({
                ...saving,
                currency: newValue?.code.toUpperCase() || '',
              })
            }}
            name='currency'
            sx={{ mb: 2 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Currency'
                helperText='Please select your currency'
                fullWidth
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }}
              />
            )}
          />
          <TextField
            margin='dense'
            id='description'
            label='Description'
            value={saving.description}
            type='text'
            fullWidth
            name='description'
            onChange={handleChange}
            variant='standard'
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={resetFields}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
