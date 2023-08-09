import { createAsyncThunk } from '@reduxjs/toolkit'
import SavingService from '../services/savingService'

export const getSavingsAsync = createAsyncThunk(
  'savings/getSavings',
  async () => {
    return await SavingService.getSavings()
  },
)

// takes in an array of savings
export const addSavingsAsync = createAsyncThunk(
  'savings/addSavings',
  async (saving) => {
    return await SavingService.addSavings(saving)
  },
)

export const updateSavingAsync = createAsyncThunk(
  'savings/updateSaving',
  async (saving) => {
    return await SavingService.updateSaving(saving)
  },
)

export const deleteSavingAsync = createAsyncThunk(
  'savings/deleteSaving',
  async (saving) => {
    return await SavingService.deleteSaving(saving)
  },
)
