import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#252525',
    },
    secondary: {
      main: '#5B5B5B',
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
