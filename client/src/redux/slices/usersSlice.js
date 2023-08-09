import { createSlice } from '@reduxjs/toolkit'
import { createUserAsync, loginAsync } from '../thunks/userThunk'

const accesstoken = localStorage.getItem('accesstoken')
  ? localStorage.getItem('accesstoken')
  : null

const DEFAULT_STATE = {
  accesstoken,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: DEFAULT_STATE,
  reducers: {
    logout: (state) => {
      state.accesstoken = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.fulfilled, (state, { payload }) => {
        state.accesstoken = payload.token
      })
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        state.accesstoken = payload.token
      })
  },
})

export const { logout } = usersSlice.actions

export default usersSlice.reducer
