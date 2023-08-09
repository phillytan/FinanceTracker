import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Divider } from '@mui/material'
import { useDispatch } from 'react-redux'
import { loginAsync } from '../redux/thunks/userThunk'
import BlockAuthenticated from '../components/BlockAuthenticated'

// https://github.com/mui/material-ui/blob/v5.13.4/docs/data/material/getting-started/templates/sign-in/SignIn.js
export default function LoginPage() {
  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    dispatch(
      loginAsync({
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
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f7f7f7',
            padding: 8,
          }}
        >
          <Typography component='h1' variant='h4'>
            Log In
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 4 }}
          >
            <TextField
              size='small'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              size='small'
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
              sx={{ mb: 2, mt: 3 }}
              color='primary'
            >
              Sign In
            </Button>
            <Divider sx={{ mb: 1 }} />
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography>Not a member yet?</Typography>
                <Link href='/signup' variant='body1' ml={1}>
                  {'Sign Up'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </BlockAuthenticated>
    </Container>
  )
}
