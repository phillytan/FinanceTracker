import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { FormHelperText } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createUserAsync } from '../redux/thunks/userThunk'
import BlockAuthenticated from '../components/BlockAuthenticated'

export default function SignupPage() {
  const dispatch = useDispatch()
  const emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
  const [isValidEmail, setIsValidEmail] = useState(true)

  const onChangeEmail = (event) => {
    const isValid = new RegExp(emailPattern).test(event.target.value)
    if (isValid !== isValidEmail) {
      setIsValidEmail(isValid)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    dispatch(
      createUserAsync({
        fname: data.get('fname'),
        lname: data.get('lname'),
        email: data.get('email'),
        password: data.get('password'),
      }),
    )
  }

  return (
    <Container component='main' maxWidth='xs'>
      <BlockAuthenticated>
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 4 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='fname'
              label='First Name'
              name='fname'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='lname'
              label='Last Name'
              name='lname'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={onChangeEmail}
              isValid={isValidEmail}
              error={!isValidEmail}
            />
            {!isValidEmail && (
              <FormHelperText error>Please enter a valid email</FormHelperText>
            )}
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              color='primary'
              disabled={!isValidEmail}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </BlockAuthenticated>
    </Container>
  )
}
