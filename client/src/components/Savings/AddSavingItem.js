import * as React from 'react'
import { useDispatch } from 'react-redux'
import { addSavingsAsync } from '../../redux/thunks/savingThunk'

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

const default_state = {
  source: '',
  amount: '',
  address: '',
  date: '',
  currency: 'CAD',
  description: '',
}

export default function AddSavingItem() {
  const [open, setOpen] = React.useState(false)
  const [saving, setSaving] = React.useState(default_state)
  const dispatch = useDispatch()

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
  }

  const handleAdd = () => {
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
    dispatch(addSavingsAsync([saving]))
    resetFields()
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Add Saving
      </Button>
      <Dialog open={open} onClose={resetFields} maxWidth='md'>
        <DialogTitle>Add Saving</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the saving details below:
          </DialogContentText>
          <TextField
            margin='dense'
            id='source'
            label='Source'
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
            defaultValue={currencies.find((x) => x?.code === 'cad')}
            getOptionLabel={(option) =>
              option ? `${option.name} (${option.code})` : 'None Selected'
            }
            fullWidth
            onChange={(_, newValue) => {
              setSaving({
                ...saving,
                currency: newValue?.code.toUpperCase(),
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
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
