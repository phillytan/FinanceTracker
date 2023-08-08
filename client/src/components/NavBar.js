import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { logout } from '../redux/slices/usersSlice'

/**
 * Component for Navigation Bar and the Drawer
 * https://mui.com/material-ui/react-drawer/
 */
const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [drawer, setDrawer] = React.useState(false)
  const accesstoken = useSelector((state) => state.users.accesstoken)

  const logoutAction = () => {
    dispatch(logout())
    localStorage.removeItem('accesstoken')
    global.setNotification('success', 'Logged Out!')
    navigate('/login')
  }

  const drawerEntries = (
    <Box
      sx={{
        width: '250px',
        height: '100%',
        backgroundColor: '#000000de;',
        color: '#dbdbdb',
      }}
      role='presentation'
      onClick={() => setDrawer(false)}
      onKeyDown={() => setDrawer(false)}
    >
      <List>
        <ListItem key='dashboard' disablePadding>
          <ListItemButton onClick={() => navigate('/dashboard')}>
            <ListItemText>My Dashboard</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem key='transactions' disablePadding>
          <ListItemButton onClick={() => navigate('/')}>
            <ListItemText>Transactions</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem key='savings' disablePadding>
          <ListItemButton onClick={() => navigate('/savings')}>
            <ListItemText>Savings</ListItemText>
          </ListItemButton>
        </ListItem>
        {accesstoken ? (
          <ListItem key='logout' disablePadding>
            <ListItemButton onClick={logoutAction}>
              <ListItemText>Log Out</ListItemText>
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem key='login' disablePadding>
            <ListItemButton onClick={() => navigate('/login')}>
              <ListItemText>Log In</ListItemText>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  )

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={() => setDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              Finance Tracker
            </Typography>
            {accesstoken ? (
              <Button color='inherit' onClick={logoutAction}>
                Log Out
              </Button>
            ) : (
              <Button color='inherit' onClick={() => navigate('/login')}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer anchor='left' open={drawer} onClose={() => setDrawer(false)}>
        {drawerEntries}
      </Drawer>
    </>
  )
}

export default NavBar
