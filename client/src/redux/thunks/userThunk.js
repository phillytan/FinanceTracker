import { createAsyncThunk } from '@reduxjs/toolkit'
import UserService from '../services/userService'

export const createUserAsync = createAsyncThunk(
  'users/createUser',
  async (transaction) => {
    return await UserService.createUser(transaction)
  },
)

export const loginAsync = createAsyncThunk(
  'users/login',
  async (transaction) => {
    return await UserService.login(transaction)
  },
)
