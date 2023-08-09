import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Notification = () => {
  const [open, setOpen] = useState(false)

  const [message, setMessage] = useState('')

  const [type, setType] = useState('info')

  global.setNotification = (type, message) => {
    setOpen(true)
    setMessage(message)
    setType(type)
  }

  return (
    <Snackbar
      id={'notification'}
      open={open}
      autoHideDuration={3500}
      onClose={() => {
        setOpen(false)
        setMessage('')
        setType('info')
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MuiAlert elevation={6} variant={'filled'} severity={type}>
        {message}
      </MuiAlert>
    </Snackbar>
  )
}

export default Notification
